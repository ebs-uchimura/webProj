/**
 * shopify.ts
 **
 * function：Shopify API アプリ
 **/

"use strict";

// 名前空間
import { myConst } from "./consts/globalvariables";
// import global interface
import { } from './@types/globaljoinsql';
// 定数
const DEV_FLG: boolean = false; // 開発フラグ

// モジュール
import { setTimeout } from 'node:timers/promises'; // wait for seconds
import { createStorefrontApiClient } from "@shopify/storefront-api-client"; // shopify
import { config as dotenv } from "dotenv"; // 秘匿情報用
import * as path from "path"; // パス用
import express from "express"; // express
import helmet from "helmet"; // セキュリティ対策用
import Logger from "./class/Logger"; // logger
import SQL from './class/MySqlJoin0427'; // DB操作用
// モジュール設定
dotenv({ path: path.join(__dirname, ".env") });

// 開発環境切り替え
let globalServerUrl: string; // サーバURL
let globalDefaultPort: number; // ポート番号
let sqlHost: string; // SQLホスト名
let sqlUser: string; // SQLユーザ名
let sqlPass: string; // SQLパスワード
let sqlDb: string; // SQLデータベース名
// ロガー設定
const logger: any = new Logger(myConst.APP_NAME, false);
// Shopify設定
const shopifyClient: any = createStorefrontApiClient({
  storeDomain: "https://mvdyqk-b9.myshopify.com",
  apiVersion: "2025-04",
  publicAccessToken: "19143491b49e79ba2d96a10ca4abbbe4",
});

// 開発モード
if (DEV_FLG) {
  globalServerUrl = myConst.HOMEDEVELOPMENT_URL!; // 検証用サーバURL
  globalDefaultPort = Number(myConst.DEV_PORT); // 検証用ポート番号
  sqlHost = process.env.SQL_DEV_HOST!; // SQLホスト名
  sqlUser = process.env.SQL_DEV_USER!; // SQLユーザ名
  sqlPass = process.env.SQL_DEV_PASS!; // SQLパスワード
  sqlDb = process.env.SQL_DEV_KEYDBNAME!; // SQLデータベース名
} else {
  globalServerUrl = myConst.DEFAULT_URL!; // サーバURL
  globalDefaultPort = Number(myConst.DEFAULT_PORT); // ポート番号
  sqlHost = process.env.SQL_HOST!; // SQLホスト名
  sqlUser = process.env.SQL_ADMINUSER!; // SQLユーザ名
  sqlPass = process.env.SQL_ADMINPASS!; // SQLパスワード
  sqlDb = process.env.SQL_KEYDBNAME!; // SQLデータベース名
}

// DB設定
const myDB: SQL = new SQL(
  sqlHost, // ホスト名
  sqlUser, // ユーザ名
  sqlPass, // ユーザパスワード
  Number(process.env.SQL_PORT), // ポート番号
  sqlDb, // DB名
  logger, // ロガー
);

// express設定
const app: any = express(); // express

app.set('views', path.join(__dirname, 'views')); // views使用
app.set('view engine', 'ejs'); // ejs使用

app.use(express.json()); // json設定
app.use(
  express.urlencoded({
    extended: true, // body parser使用
  })
);
app.use(express.static(path.join(__dirname, 'public'))); // public使用

// ヘルメット使用
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": [
          "'self'",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
          "https://cdn.jsdelivr.net",
        ],
        "img-src": ["'self'", "https: data:"],
      },
    },
  })
);

// トップページ
app.get("/", async (_: express.Request, res: express.Response) => {
  try {
    logger.info("top connected.");
    // おススメデータ
    const productRecommendArgs: joindoubleargs = {
      table: 'product', // テーブル
      columns: ['usable'], // カラム
      values: [[1]], // 値
      originid1: 'id',
      originid2: 'category_id',
      jointable1: 'recommend',
      jointable2: 'category',
      joincolumns1: ['usable'],
      joincolumns2: ['usable'],
      joinvalues1: [[1]], // 値
      joinvalues2: [[1]], // 値
      joinid1: 'product_id',
      joinid2: 'id',
      limit: 3,
      order: 'id',
      ordertable: 'product',
      fields: ['product.id', 'product.productname', 'product.imagepath', 'product.description', 'category.categoryname'],
    };
    // ニュースデータ
    const productNewArgs: joindoubleargs = {
      table: 'product', // テーブル
      columns: ['usable'], // カラム
      values: [[1]], // 値
      originid1: 'id',
      originid2: 'category_id',
      jointable1: 'new',
      jointable2: 'category',
      joincolumns1: ['usable'],
      joincolumns2: ['usable'],
      joinvalues1: [[1]], // 値
      joinvalues2: [[1]], // 値
      joinid1: 'product_id',
      joinid2: 'id',
      limit: 3,
      order: 'id',
      ordertable: 'product',
      fields: ['product.id', 'product.productname', 'product.imagepath', 'product.description', 'category.categoryname'],
    };
    // ランキングデータ
    const productRankingArgs: joinargs = {
      table: 'product', // テーブル
      columns: ['usable'],  // カラム
      values: [[1]], // 値
      originid: 'category_id',
      jointable: 'category',
      joincolumns: ['usable'],
      joinvalues: [[1]], // 値
      joinid: 'id',
      limit: 5,
      order: 'id',
      ordertable: 'product',
      fields: ['product.id', 'product.productname', 'product.imagepath', 'product.description', 'category.categoryname'],
    };
    // 全カテゴリ
    const categoryArgs: selectargs = {
      table: 'category',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 6,
    };
    // 全ニュース
    const newsArgs: selectargs = {
      table: 'news',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 4,
    };
    // おすすめ商品抽出
    const selectedJoinRecommendData: any = await myDB.selectDoubleJoinDB(productRecommendArgs);
    // 結果
    if (selectedJoinRecommendData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedJoinRecommendData error');
    } else if (selectedJoinRecommendData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedJoinRecommendData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedJoinRecommendData end');
    }
    // 新商品抽出
    const selectedJoinNewData: any = await myDB.selectDoubleJoinDB(productNewArgs);
    // 結果
    if (selectedJoinNewData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedJoinNewData error');
    } else if (selectedJoinNewData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedJoinNewData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedJoinNewData end');
    }
    // ランキング
    const selectedJoinRankingData: any = await myDB.selectJoinDB(productRankingArgs);
    // 結果
    if (selectedJoinRankingData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedJoinRankingData error');
    } else if (selectedJoinRankingData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedJoinRankingData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedJoinRankingData end');
    }
    // カテゴリ
    const tmpCategoryData: any = await myDB.selectDB(categoryArgs);
    // 結果
    if (tmpCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: tmpCategoryData error');
    } else if (tmpCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: tmpCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: tmpCategoryData end');
    }
    // ニュース抽出
    const selectedNewsData: any = await myDB.selectDB(newsArgs);
    // 結果
    if (selectedNewsData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedNewsData error');
    } else if (selectedNewsData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedNewsData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedNewsData end');
    }
    // ウェイト
    await setTimeout(500);
    // ページ表示
    res.render("index", {
      recommend: selectedJoinRecommendData, // おススメ商品
      newdata: selectedJoinNewData, // 新商品
      ranking: selectedJoinRankingData, // ランキング商品
      recent: selectedJoinNewData, // 最近のアイテム
      news: selectedNewsData, // おススメ商品
      category: tmpCategoryData, // カテゴリ
    });

  } catch (e: unknown) {
    console.log(e);
    // 認証エラー
    res.render('error', {
      title: 'DBエラー',
      message: 'DB抽出エラー'
    });
  }
});

// カテゴリ
app.get("/category/:no", async (req: express.Request, res: express.Response) => {
  try {
    logger.info("category connected.");
    // カテゴリNO
    const categoryNo: any = req.params.no;
    // カテゴリ商品データ
    const productCategoryArgs: joinargs = {
      table: 'product', // テーブル
      columns: ['category_id', 'usable'],  // カラム
      values: [[categoryNo], [1]], // 値
      originid: 'category_id',
      jointable: 'category',
      joincolumns: ['usable'],
      joinvalues: [[1]], // 値
      joinid: 'id',
      order: 'id',
      ordertable: 'product',
      fields: ['product.id', 'product.productname', 'product.imagepath', 'product.priceRange', 'category.categoryname'],
    };
    // 全カテゴリ
    const allCategoryArgs: selectargs = {
      table: 'category',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 6,
    };
    // 選択カテゴリ
    const selectedCategoryArgs: selectargs = {
      table: 'category',
      columns: ['id', 'usable'],
      values: [[categoryNo], [1]],
      order: 'id',
    };
    // カテゴリ商品データ
    const selectedJoinProductData: any = await myDB.selectJoinDB(productCategoryArgs);
    // 結果
    if (selectedJoinProductData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedJoinProductData error');
    } else if (selectedJoinProductData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedJoinProductData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedJoinProductData end');
    }
    // 価格修正作業
    if (typeof (selectedJoinProductData) != 'string') {
      selectedJoinProductData.map((product: any) => {
        product.priceRange = product.priceRange.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
      });
    }

    // カテゴリ商品データ
    const allCategoryData: any = await myDB.selectDB(allCategoryArgs);
    // 結果
    if (allCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: allCategoryData error');
    } else if (allCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: allCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: allCategoryData end');
    }

    // カテゴリ商品データ
    const selectedCategoryData: any = await myDB.selectDB(selectedCategoryArgs);
    // 結果
    if (selectedCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedCategoryData error');
    } else if (selectedCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedCategoryData end');
    }
    // ウェイト
    await setTimeout(500);
    // ページ表示
    res.render("category", {
      selectedCategory: selectedCategoryData[0],
      product: selectedJoinProductData,
      categories: allCategoryData,
    });

  } catch (e: unknown) {
    console.log(e);
  }
});

// ログイン
app.get("/login", async (_: express.Request, res: express.Response) => {
  try {
     logger.info("login connected.");
     // 全カテゴリ
    const categoryArgs: selectargs = {
      table: 'category',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 6,
    };
    // カテゴリ商品データ
    const selectedCategoryData: any = await myDB.selectDB(categoryArgs);
    // 結果
    if (selectedCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedCategoryData error');
    } else if (selectedCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedCategoryData end');
    }
    res.render('login', {
      category: selectedCategoryData,
    });

  } catch(e) {
    console.log(e);
    // 認証エラー
    res.render('error', {
      title: 'DBエラー',
      message: 'DB抽出エラー'
    });
  }
});

// 新規登録
app.get("/memberreg", async (_: express.Request, res: express.Response) => {
  try {
     logger.info("memberreg connected.");
     // 全カテゴリ
    const categoryArgs: selectargs = {
      table: 'category',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 6,
    };
    // カテゴリ商品データ
    const selectedCategoryData: any = await myDB.selectDB(categoryArgs);
    // 結果
    if (selectedCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedCategoryData error');
    } else if (selectedCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedCategoryData end');
    }
    res.render('account', {
      category: selectedCategoryData,
    });

  } catch(e) {
    console.log(e);
    // 認証エラー
    res.render('error', {
      title: 'DBエラー',
      message: 'DB抽出エラー'
    });
  }
});

// マイページ
app.get("/mypage", async (_: express.Request, res: express.Response) => {
  try {
     logger.info("mypage connected.");
     // 全カテゴリ
    const categoryArgs: selectargs = {
      table: 'category',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 6,
    };
    // カテゴリ商品データ
    const selectedCategoryData: any = await myDB.selectDB(categoryArgs);
    // 結果
    if (selectedCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedCategoryData error');
    } else if (selectedCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedCategoryData end');
    }
    res.render('mypage', {
      category: selectedCategoryData,
    });

  } catch(e) {
    console.log(e);
    // 認証エラー
    res.render('error', {
      title: 'DBエラー',
      message: 'DB抽出エラー'
    });
  }
});

// 商品
app.get("/product/:no", async (req: express.Request, res: express.Response) => {
  try {
    logger.info("product connected.");
    // 商品NO
    const productNo: any = req.params.no;
    // 全カテゴリ
    const categoryArgs: selectargs = {
      table: 'category',
      columns: ['usable'],
      values: [[1]],
      order: 'id',
      limit: 6,
    };
    // おススメデータ
    const productRecommendArgs: joindoubleargs = {
      table: 'product', // テーブル
      columns: ['usable'], // カラム
      values: [[1]], // 値
      originid1: 'id',
      originid2: 'category_id',
      jointable1: 'recommend',
      jointable2: 'category',
      joincolumns1: ['usable'],
      joincolumns2: ['usable'],
      joinvalues1: [[1]], // 値
      joinvalues2: [[1]], // 値
      joinid1: 'product_id',
      joinid2: 'id',
      limit: 3,
      order: 'id',
      ordertable: 'product',
      fields: ['product.id', 'product.productname', 'product.imagepath', 'product.description', 'category.categoryname'],
    };
    // カテゴリ商品データ
    const productCategoryArgs: joinargs = {
      table: 'product', // テーブル
      columns: ['id', 'usable'],  // カラム
      values: [[productNo], [1]], // 値
      originid: 'category_id',
      jointable: 'category',
      joincolumns: ['usable'],
      joinvalues: [[1]], // 値
      joinid: 'id',
      order: 'id',
      ordertable: 'product',
      fields: ['product.id', 'product.productname', 'product.imagepath', 'product.description', 'product.priceRange', 'category.categoryname'],
    };
    // おすすめ商品抽出
    const selectedJoinRecommendData: any = await myDB.selectDoubleJoinDB(productRecommendArgs);
    // 結果
    if (selectedJoinRecommendData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedJoinRecommendData error');
    } else if (selectedJoinRecommendData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedJoinRecommendData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedJoinRecommendData end');
    }
    // 商品
    const tmpProductData: any = await myDB.selectJoinDB(productCategoryArgs);
    // 結果
    if (tmpProductData == 'error') {
      // DBエラー
      throw new Error('mysql: tmpProductData error');
    } else if (tmpProductData == 'empty') {
      // ヒットなし
      logger.debug('mysql: tmpProductData empty');
    } else {
      // 成功
      logger.debug('mysql: tmpProductData end');
    }
    // 価格修正作業
    if (tmpProductData != 'empty') {
      tmpProductData[0].id = tmpProductData[0].id.toString().padStart(4, '0');
      tmpProductData[0].priceRange = tmpProductData[0].priceRange.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
    }
    // カテゴリ商品データ
    const selectedCategoryData: any = await myDB.selectDB(categoryArgs);
    // 結果
    if (selectedCategoryData == 'error') {
      // DBエラー
      throw new Error('mysql: selectedCategoryData error');
    } else if (selectedCategoryData == 'empty') {
      // ヒットなし
      logger.debug('mysql: selectedCategoryData empty');
    } else {
      // 成功
      logger.debug('mysql: selectedCategoryData end');
    }
    // ウェイト
    await setTimeout(500);
    // ページ表示
    res.render("detail", {
      category: selectedCategoryData,
      product: tmpProductData[0],
      recommend: selectedJoinRecommendData,
    });

  } catch (e: unknown) {
    console.log(e);
  }
});

// 買い物かご
app.post("/update/cart", async (req: express.Request, _: express.Response) => {
  try {
    logger.info("cart reg connected.");
    // 数量
    const buyingNum = Number(req.body.num);
    // 商品ID
    const productId = Number(req.body.pid);
    // 数値判定
    if (!isNumber(productId)) {
      throw new Error('type: not number error');
    }
    // 対象商品
    const productArgs: selectargs = {
      table: 'product',
      columns: ['id', 'usable'],
      values: [[productId], [1]],
    };
    // 商品
    const tmpProductData: any = await myDB.selectDB(productArgs);
    // 結果
    if (tmpProductData == 'error') {
      // DBエラー
      throw new Error('mysql: tmpProductData error');
    } else if (tmpProductData == 'empty') {
      // ヒットなし
      logger.debug('mysql: tmpProductData empty');
    } else {
      // 成功
      logger.debug('mysql: tmpProductData end');
      // バリアントID
      const variantID: string = 'gid://shopify/ProductVariant/' + tmpProductData[0].variantid;
      // created cart
      const createdCart: any = await createCartWithItem(buyingNum, variantID);
      const cartId = createdCart.cartCreate.cart.id;
      // カートの中身
      const cartStatus: any = await getAllCart(cartId);
      console.log(cartStatus);
      // add to cart
      //const result: any = await addToCart(createdCart.cartCreate.cart.id, variantID, 1);
      //console.log(result);
      
      // ウェイト
      await setTimeout(500);
    }
   
    // ページ表示
    /*
    res.render("index", {
      product: products, // 商品
      category: categoryAll, // カテゴリ
      cart: gotItems, // カート
    });
    */

  } catch (e: unknown) {
    console.log(e);
  }
});

// いいね登録
app.post("/update/goodon", async (req: express.Request, _: express.Response) => {
  try {
    logger.info("goodon reg connected.");
    // 商品ID
    const productId: number = Number(req.body.id);
    // 対象データ
    const insertDataArgs: insertargs = {
      table: 'favorite', // テーブル
      columns: ['product_id', 'usable'], // カラム
      values: [productId, 1], // 値
    };
    // インサートID
    const insertedFavoriteId: any = await myDB.insertDB(insertDataArgs);
    // 結果
    if (insertedFavoriteId == 'error' || insertedFavoriteId == 'empty') {
      // エラー
      throw new Error('insertData: favorite insert error');
    } else {
      // 成功
      logger.debug('mysql: insertData end');
    }

  } catch (e: unknown) {
    console.log(e);
  }
});

// いいね削除
app.post("/update/goodoff", async (req: express.Request, _: express.Response) => {
  try {
    logger.info("goodoff connected.");
    // 商品ID
    const productId = req.body.id;
    // 対象データ
    const updateAssetArgs: updateargs = {
      table: 'favorite', // テーブル
      setcol: [''], // 準備完了
      setval: [], // 待機状態
      selcol: ['product_id', 'usable'], // 対象
      selval: [productId, 1], // 対象値
    };
    const updateUserResult: any = await myDB.updateDB(updateAssetArgs);
    // 結果
    if (updateUserResult == 'error' || updateUserResult == 'empty') {
      // エラー
      throw new Error('updateDB: favorite update error');
    } else {
      // 成功
      logger.debug('mysql: updateDB end');
    }

  } catch (e: unknown) {
    console.log(e);
  }
});

/// 管理画面
// 管理画面トップ
app.get(
  "/manage",
  /*
  passport.authenticate("basic", {
    session: false,
    
  }),*/
  (_: express.Request, res: express.Response) => {
    try {
      logger.info("manage: auth connected.");
      // 管理画面表示
      res.render("manage", {
        title: "compassLinq",
        root: globalServerUrl,
      });

    } catch (e: unknown) {
      console.log(e);
    }
  }
);

// 商品管理画面
app.get(
  "/manage/product",
  /*
  passport.authenticate("basic", {
    session: false,
    }),*/
  async (_: any, res: any) => {
    try {
      logger.info("manage: product connected.");
      // 受取用変数
      let recommenddata: any;
      let newdata: any;
      // 全カテゴリ
      const productArgs: selectargs = {
        table: 'product',
        columns: ['usable'],
        values: [[1]],
        order: 'id',
      };
      // 商品
      const tmpProductData: any = await myDB.selectDB(productArgs);
      // 結果
      if (tmpProductData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpProductData error');
      } else if (tmpProductData == 'empty') {
        // ヒットなし
        logger.debug('mysql: tmpProductData empty');
      } else {
        // 成功
        logger.debug('mysql: tmpProductData end');
      }
      // 全カテゴリ
      const recommendArgs: selectargs = {
        table: 'recommend',
        columns: ['usable'],
        values: [[1]],
        order: 'id',
      };
      // 商品
      const tmpRecommendData: any = await myDB.selectDB(recommendArgs);
      // 結果
      if (tmpRecommendData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpRecommendData error');
      } else if (tmpRecommendData == 'empty') {
        // ヒットなし
        logger.debug('mysql: tmpRecommendData empty');
      } else {
        // 成功
        logger.debug('mysql: tmpRecommendData end');
        
        // ID抽出
        recommenddata = tmpRecommendData.flatMap((recitem: any) => {
          return recitem.product_id;
        });
      }
      // 新商品カテゴリ
      const newArgs: selectargs = {
        table: 'new',
        columns: ['usable'],
        values: [[1]],
        order: 'id',
      };
      // 新商品
      const tmpNewData: any = await myDB.selectDB(newArgs);
      // 結果
      if (tmpNewData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpNewData error');
      } else if (tmpNewData == 'empty') {
        // ヒットなし
        logger.debug('mysql: tmpNewData empty');
      } else {
        // 成功
        logger.debug('mysql: tmpNewData end');
        // ID抽出
        newdata = tmpNewData.flatMap((newitem: any) => {
          return newitem.product_id;
        });
      }
      // ウェイト
      await setTimeout(500);
      
      // 商品管理画面表示
      res.render("product_manage", {
        title: "shopify商品",
        root: globalServerUrl,
        data: tmpProductData,
        recommendarr: recommenddata,
        newarr: newdata,
      });
      
    } catch (e: unknown) {
      console.log(e);
    }
  }
);

// カテゴリ管理画面
app.get(
  "/manage/category",
  /*
  passport.authenticate("basic", {
    session: false,
    }),*/
  async (_: express.Request, res: express.Response) => {
    try {
      logger.info("manage: category connected.");
      // 全カテゴリ
      const categoryArgs: selectargs = {
        table: 'category',
        columns: ['usable'],
        values: [[0, 1]],
        order: 'id',
      };
      // カテゴリ商品データ
      const tmpCategoryData: any = await myDB.selectDB(categoryArgs);
      // 結果
      if (tmpCategoryData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpCategoryData error');
      } else if (tmpCategoryData == 'empty') {
        // ヒットなし
        logger.debug('mysql: tmpCategoryData empty');
      } else {
        // 成功
        logger.debug('mysql: tmpCategoryData end');
      }
      // ウェイト
      await setTimeout(500);
      
      // カテゴリ管理画面表示
      res.render("category_manage", {
        title: "shopifyカテゴリ",
        root: globalServerUrl,
        data: tmpCategoryData,
      });

    } catch (e: unknown) {
      console.log(e);
    }
  }
);

// レビュー管理画面
app.get(
  "/manage/review",
  /*
  passport.authenticate("basic", {
    session: false,
   }),*/
  async (_: express.Request, res: express.Response) => {
    try {
      logger.info("manage: review connected.");
      // 送付用
      let sendData: any;
      // 全レビュー
      const reviewArgs: selectargs = {
        table: 'review',
        columns: ['usable'],
        values: [[1]],
        order: 'id',
      };
      // 全いいねデータ
      const tmpReviewData: any = await myDB.selectDB(reviewArgs);
      // 結果
      if (tmpReviewData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpReviewData error');
      } else if (tmpReviewData == 'empty') {
        // ヒットなし
        sendData = [];
        logger.debug('mysql: tmpReviewData empty');
      } else {
        // 成功
        sendData = tmpReviewData;
        logger.debug('mysql: tmpReviewData end');
      }
      // ウェイト
      await setTimeout(500);
      console.log(sendData);

      // いいね管理画面表示
      res.render("review_manage", {
        title: "shopifyレビュー",
        root: globalServerUrl,
        data: sendData,
      });

    } catch (e: unknown) {
      console.log(e);
    }
  }
);

// いいね管理画面
app.get(
  "/manage/good",
  /*
  passport.authenticate("basic", {
    session: false,
    }),*/
  async (_: express.Request, res: express.Response) => {
    try {
      logger.info("manage: good connected.");
      // 送付用
      let sendData: any;
      // 全いいね
      const favoriteArgs: selectargs = {
        table: 'favorite',
        columns: ['usable'],
        values: [[1]],
        order: 'id',
      };
      // 全いいねデータ
      const tmpFavoriteData: any = await myDB.selectDB(favoriteArgs);
      // 結果
      if (tmpFavoriteData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpFavoriteData error');
      } else if (tmpFavoriteData == 'empty') {
        // ヒットなし
        sendData = [];
        logger.debug('mysql: tmpFavoriteData empty');
      } else {
        // 成功
        sendData = tmpFavoriteData;
        logger.debug('mysql: tmpFavoriteData end');
      }
      // ウェイト
      await setTimeout(500);
      console.log(sendData);

      // いいね管理画面表示
      res.render("good_manage", {
        title: "shopifyいいね",
        root: globalServerUrl,
        data: sendData,
      });

    } catch (e: unknown) {
      console.log(e);
    }
  }
);

// ニュース管理画面
app.get(
  "/manage/news",
  /*
  passport.authenticate("basic", {
    session: false,
    }),*/
  async (_: express.Request, res: express.Response) => {
    try {
      logger.info("manage: news connected.");
      // 送付用
      let sendData: any;
      // 全ニュース
      const newsArgs: selectargs = {
        table: 'news',
        columns: ['usable'],
        values: [[0, 1]],
        order: 'id',
      };
      // ニュースデータ
      const tmpNewsData: any = await myDB.selectDB(newsArgs);
      // 結果
      if (tmpNewsData == 'error') {
        // DBエラー
        throw new Error('mysql: tmpNewsData error');
      } else if (tmpNewsData == 'empty') {
        // ヒットなし
        sendData = [];
        logger.debug('mysql: tmpNewsData empty');
      } else {
        // 成功
        sendData = tmpNewsData;
        logger.debug('mysql: tmpNewsData end');
      }
      // ウェイト
      await setTimeout(500);
      console.log(sendData);

      // ニュース管理画面表示
      res.render("news_manage", {
        title: "shopifyニュース",
        root: globalServerUrl,
        data: sendData,
      });

    } catch (e: unknown) {
      console.log(e);
    }
  }
);

// 初期化
app.post("/manage/init", async (_: express.Request, res: express.Response) => {
  try {
    logger.info("manage: init reg mode");
    // カテゴリデータ
    const categoryData: any = await getCategoryData(250);
    // 商品データ
    const productData: any = await getProductData(250);

    // カテゴリデータ登録
    for await (const [idx, data] of Object.entries(categoryData.gids)) {
      // 対象
      const cID = typeof data === "string" ? data : String(data);
      // 対象データ
      const categoryCountArgs: countargs = {
        table: 'category', // テーブル
        columns: ['categorygid', 'usable'], // カラム
        values: [[cID], [1]], // 値
      };
      // 対象データ取得
      const categoryCount: number = await myDB.countDB(categoryCountArgs);

      // 登録なし
      if (categoryCount == 0) {
        // 対象データ
        const insertCategoryArgs: insertargs = {
          table: 'category', // テーブル
          columns: ['categorygid', 'categoryname', 'usable'], // カラム
          values: [cID, categoryData.names[idx], 1], // 値
        };
        // インサートID
        const insertedCategoryData: any = await myDB.insertDB(insertCategoryArgs);
        // 結果
        if (insertedCategoryData == 'error' || insertedCategoryData == 'empty') {
          // エラー
          throw new Error('insertData: category insert error');
        } else {
          // 成功
          logger.debug('mysql: insertData end');
        }

      } else {
        // 対象データ
        const updateAssetArgs: updateargs = {
          table: 'category', // テーブル
          setcol: ['categoryname', 'usable'], // 準備完了
          setval: [categoryData.names[idx], 1], // 待機状態
          selcol: ['categorygid', 'usable'], // 対象
          selval: [cID, 1], // 対象値
        };
        const updateUserResult: any = await myDB.updateDB(updateAssetArgs);
        // 結果
        if (updateUserResult == 'error' || updateUserResult == 'empty') {
          // エラー
          throw new Error('updateDB: category update error');
        } else {
          // 成功
          logger.debug('mysql: updateDB end');
        }
      };
    };

    // 商品データ登録
    for await (const [idx, _] of Object.entries(productData)) {
      // 商品ID
      const productGid: string = productData[idx].id;
      // 商品名
      const productName: string = productData[idx].title;
      // 在庫数
      const productStock: number = productData[idx].totalInventory;
      // 商品詳細
      const productDetail: String = productData[idx].description;
      // 商品画像URL
      const productImagePath: String = productData[idx].featuredImage.url;
      // カテゴリ名
      const productCategoryname: String = productData[idx].category.name;
      // 価格
      const productPrice = Math.floor(productData[idx].priceRange.maxVariantPrice.amount);
      // 商品登録数カウント
      const productCountArgs: countargs = {
        table: 'product', // テーブル
        columns: ['productgid', 'usable'], // カラム
        values: [[productGid], [1]], // 値
      };
      // 対象データ取得
      const targetProductCount: number = await myDB.countDB(productCountArgs);
      // ユーザ数
      logger.debug('mysql: countAssets end');

      // 登録なし
      if (targetProductCount == 0) {
        // 全カテゴリ
        const categoryArgs: selectargs = {
          table: 'category',
          columns: ['categoryname', 'usable'],
          values: [[productCategoryname], [1]],
          order: 'id',
        };
        // 全商品データ
        const tmpProductData: any = await myDB.selectDB(categoryArgs);
        // 結果
        if (tmpProductData == 'error') {
          // DBエラー
          throw new Error('mysql: tmpProductData error');
        } else if (tmpProductData == 'empty') {
          // ヒットなし
          logger.debug('mysql: tmpProductData empty');
        } else {
          // 成功
          logger.debug('mysql: tmpProductData end');
        }
        // 重複有
        if (tmpProductData.length > 1) {
          // エラー
          throw new Error('insertData: duplicate insert error');
        }
        // 対象データ
        const insertDataArgs: insertargs = {
          table: 'product', // テーブル
          columns: ['category_id', 'productgid', 'productname', 'stock', 'description', 'imagepath', 'priceRange', 'usable'], // カラム
          values: [tmpProductData[0].id, productGid, productName, productStock, productDetail, productImagePath, productPrice, 1], // 値
        };
        // インサートID
        const insertedProductId: any = await myDB.insertDB(insertDataArgs);
        // 結果
        if (insertedProductId == 'error' || insertedProductId == 'empty') {
          // エラー
          throw new Error('insertData: product insert error');
        } else {
          // 成功
          logger.debug('mysql: insertData end');
        }

      } else {
        // 対象データ
        const updateAssetArgs: updateargs = {
          table: 'product', // テーブル
          setcol: ['categoryname', 'stock', 'description', 'imagepath', 'priceRange', 'usable'], // 準備完了
          setval: [productCategoryname, productStock, productDetail, productImagePath, productPrice, 1], // 待機状態
          selcol: ['productgid', 'usable'], // 対象
          selval: [productData.ids[idx], 1], // 対象値
        };
        const updateUserResult: any = await myDB.updateDB(updateAssetArgs);
        // 結果
        if (updateUserResult == 'error' || updateUserResult == 'empty') {
          // エラー
          throw new Error('updateDB: category update error');
        } else {
          // 成功
          logger.debug('mysql: updateDB end');
        }
      };
    };
    logger.debug("init category mode"); 4
    // ウェイト
    await setTimeout(500);
    // 完了
    res.render("complete", {});

  } catch (e: unknown) {
    console.log(e);
  }
});

// カテゴリアップデート
app.post("/manage/category", async (req: express.Request, res: express.Response) => {
  try {
    logger.info("manage: category reg connected.");
    // ID
    const ids: string[] = req.body.id;
    // 画像url
    const imageUrls: string[] = req.body.imageurl;
    // 英語名
    const englishNames: string[] = req.body.englishname;
    // コンテンツ
    const contexts: string[] = req.body.context;
    // チェックインデックス
    const useCheckedIndex: string[] = req.body.check;

    // 商品データ登録
    for await (const [i, _] of Object.entries(ids)) {
      // インデックス
      const idx: number = Number(i);
      // gid
      const gid: number = Number(ids[idx]);
      // 画像url
      const imageUrl: string = imageUrls[idx];
      // 英語カテゴリ名
      const englishName: string = englishNames[idx];
      // 説明文
      const context: string = contexts[idx];

      // 空でない
      if (imageUrl != "") {
        // 対象データ
        const updateImagepathArgs: updateargs = {
          table: 'category', // テーブル
          setcol: ['imagepath', 'usable'], // 準備完了
          setval: [imageUrl, 1], // 待機状態
          selcol: ['id', 'usable'], // 対象
          selval: [gid, 1], // 対象値
        };
        const updateimagePathResult: any = await myDB.updateDB(updateImagepathArgs);
        // 結果
        if (updateimagePathResult == 'error' || updateimagePathResult == 'empty') {
          // エラー
          throw new Error('updateDB: imagepath update error');
        } else {
          // 成功
          logger.debug('mysql: updateDB end');
        }
      }
      // 空でない
      if (englishName != "") {
        // 対象データ
        const updateEnglishnameArgs: updateargs = {
          table: 'category', // テーブル
          setcol: ['englishname', 'usable'], // 準備完了
          setval: [englishName.toUpperCase(), 1], // 待機状態
          selcol: ['id', 'usable'], // 対象
          selval: [gid, 1], // 対象値
        };
        const updateEnglishpathResult: any = await myDB.updateDB(updateEnglishnameArgs);
        // 結果
        if (updateEnglishpathResult == 'error' || updateEnglishpathResult == 'empty') {
          // エラー
          throw new Error('updateDB: englishname update error');
        } else {
          // 成功
          logger.debug('mysql: updateDB end');
        }
      }
      // 空でない
      if (context != "") {
        // 対象データ
        const updateContextArgs: updateargs = {
          table: 'category', // テーブル
          setcol: ['context', 'usable'], // 準備完了
          setval: [context, 1], // 待機状態
          selcol: ['id', 'usable'], // 対象
          selval: [gid, 1], // 対象値
        };
        const updateContextResult: any = await myDB.updateDB(updateContextArgs);
        // 結果
        if (updateContextResult == 'error' || updateContextResult == 'empty') {
          // エラー
          throw new Error('updateDB: context update error');
        } else {
          // 成功
          logger.debug('mysql: updateDB end');
        }
      }
    };

    // 登録アリ
    if (useCheckedIndex.length > 0) {
      // 対象データ
      const updateAllIdArgs: updateargs = {
        table: 'category', // テーブル
        setcol: ['usable'], // 準備完了
        setval: [0], // 待機状態
        selcol: ['usable'], // 対象
        selval: [1], // 対象値
      };
      const updateAllIdResult: any = await myDB.updateDB(updateAllIdArgs);
      // 結果
      if (updateAllIdResult == 'error' || updateAllIdResult == 'empty') {
        // エラー
        throw new Error('updateDB: all id update error');
      } else {
        // 成功
        logger.debug('mysql: updateDB end');
        // 商品データ登録
        for await (const id of useCheckedIndex) {
          // gid
          const gid: number = Number(id);
          // 対象データ
          const updateIdArgs: updateargs = {
            table: 'category', // テーブル
            setcol: ['usable'], // 準備完了
            setval: [1], // 待機状態
            selcol: ['id', 'usable'], // 対象
            selval: [gid, 0], // 対象値
          };
          const updateIdResult: any = await myDB.updateDB(updateIdArgs);
          // 結果
          if (updateIdResult == 'error' || updateIdResult == 'empty') {
            // エラー
            throw new Error('updateDB: imagepath update error');
          } else {
            // 成功
            logger.debug('mysql: updateDB end');
          }
        }
      }
    }
    // ウェイト
    await setTimeout(500);
    // 完了
    res.render("complete", {});

  } catch (e: unknown) {
    console.log(e);
  }
});

// 商品アップデート
app.post("/manage/product", async (req: express.Request, res: express.Response) => {
  try {
    logger.info("manage: product reg connected.");
    // チェックインデックス
    const recommendCheckedIndex: any = req.body.check1;
    // 新商品インデックス
    const newCheckedIndex: any = req.body.check2;
    // 全ID
    const checkedId: any = req.body.id;
    // バリアントID
    const variantids: string[] = req.body.variantid;

    // おススメデータ初期化用
    const updateRecommendArgs: updateargs = {
      table: 'recommend', // おススメ
      setcol: ['usable'], // 使用可能
      setval: [0], // 不可
      selcol: ['usable'], // 使用可能
      selval: [1], // 可能
    };
    // おススメデータ初期化
    const updateRecommendResult: any = await myDB.updateDB(updateRecommendArgs);
    // 結果
    if (updateRecommendResult == 'error' || updateRecommendResult == 'empty') {
      // エラー
      throw new Error('updateDB: category update error');
    } else {
      // 成功
      logger.debug('mysql: updateDB end');
    }

    // 新商品データ初期化用
    const updateNewArgs: updateargs = {
      table: 'new', // 新商品
      setcol: ['usable'], // 使用可能
      setval: [0], // 不可
      selcol: ['usable'], // 使用可能
      selval: [1], // 可能
    };
    // 新商品データ初期化
    const updateNewResult: any = await myDB.updateDB(updateNewArgs);
    // 結果
    if (updateNewResult == 'error' || updateNewResult == 'empty') {
      // エラー
      throw new Error('updateDB: category update error');
    } else {
      // 成功
      logger.debug('mysql: updateDB end');
    }
  
    // おススメ対象インデックス
    for await (const i of recommendCheckedIndex) {
      // インデックス
      const idx: number = Number(checkedId[i]);
      // 対象データ
      const insertRecommendArgs: insertargs = {
        table: 'recommend', // テーブル
        columns: ['product_id', 'usable'], // カラム
        values: [idx, 1], // 値
      };
      // インサートID
      const insertedProductId: any = await myDB.insertDB(insertRecommendArgs);
      // 結果
      if (insertedProductId == 'error' || insertedProductId == 'empty') {
        // エラー
        throw new Error('insertData: product insert error');
      } else {
        // 成功
        logger.debug('mysql: insertData end');
      }
    };

    // 新商品インデックス
    for await (const i of newCheckedIndex) {
      // インデックス
      const idx: number = Number(checkedId[i]);
      // 対象データ
      const insertNewArgs: insertargs = {
        table: 'new', // テーブル
        columns: ['product_id', 'usable'], // カラム
        values: [idx, 1], // 値
      };
      // インサートID
      const insertedProductId: any = await myDB.insertDB(insertNewArgs);
      // 結果
      if (insertedProductId == 'error' || insertedProductId == 'empty') {
        // エラー
        throw new Error('insertData: product insert error');
      } else {
        // 成功
        logger.debug('mysql: insertData end');
      }
    };

    // 登録アリ
    if (variantids.length > 0) {
      // 商品データ登録
      for await (const [i, _] of Object.entries(variantids)) {
        // インデックス
        const idx: number = Number(i);
        // gid
        const gid: number = Number(checkedId[idx]);
        // バリアントID
        const variant: string = variantids[idx];
        // 商品データ
        const updateProductArgs: updateargs = {
          table: 'product', // テーブル
          setcol: ['variantid'], // バリアントID
          setval: [variant], // 更新対象
          selcol: ['id', 'usable'], // 対象
          selval: [gid, 1], // 対象値
        };
        // 商品データ更新
        const updateProductResult: any = await myDB.updateDB(updateProductArgs);
        // 結果
        if (updateProductResult == 'error' || updateProductResult == 'empty') {
          // エラー
          throw new Error('updateDB: category update error');
        } else {
          // 成功
          logger.debug('mysql: updateDB end');
        }
      }
    }
    // ウェイト
    await setTimeout(500);
    // 完了
    res.render("complete", {});

  } catch (e: unknown) {
    console.log(e);
  }
});

// ニュースアップデート
app.post("/manage/news", async (req: express.Request, res: express.Response) => {
  try {
    logger.info("manage: news reg connected.");
    // 日付
    const reqDates: any = req.body.datepicker;
    // ニュースタイトル
    const reqTitles: any = req.body.title;
    // ニュース
    const reqContexts: any = req.body.context;
     // 全ID
    const checkedIds: any = req.body.id;
    // チェックインデックス
    const checkedIndex: any = req.body.check;
    console.log(reqDates);
    console.log(reqTitles);
    console.log(reqContexts);
    console.log(checkedIds);
    console.log(checkedIndex);

    // ニュースインデックス
    for await (const i of checkedIds) {
      // インデックス
      const idx: number = Number(checkedIndex[i]);
      // インデックス
      const date: string = reqDates[i];
      // ニュースタイトル
      const title: string = reqTitles[i];
      // ニュース
      const context: string = reqContexts[i];

      // 対象データ
      const insertNewArgs: insertargs = {
        table: 'new', // テーブル
        columns: ['title', 'context', 'date', 'usable'], // カラム
        values: [title, context, date, idx], // 値
      };
      // ニュースID
      const insertedNewsId: any = await myDB.insertDB(insertNewArgs);
      // 結果
      if (insertedNewsId == 'error' || insertedNewsId == 'empty') {
        // エラー
        throw new Error('insertData: product insert error');
      } else {
        // 成功
        logger.debug('mysql: insertData end');
      }
    };
    // ウェイト
    await setTimeout(500);
    // 完了
    res.render("complete", {});

  } catch (e: unknown) {
    console.log(e);
  }
});

// 3000番待機
app.listen(globalDefaultPort, () => {
  logger.info(
    `GMO card app listening at ${globalServerUrl}`
  );
});

// 商品取得
const getProductData = async (num: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.debug("getProductData mode");
      // 商品クエリ
      const productQuery: string = `{
        products (
          first: ${num},
        ) {
          nodes {
            id
            title
            totalInventory
            availableForSale
            description
            featuredImage {
              url
            }
            category {
              name
            }
            priceRange {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
          }
        }
      }`;
      // 商品取得
      const { data } = await shopifyClient.request(productQuery);
      // 結果返し
      resolve(data.products.nodes);

    } catch (e) {
      // エラー
      logger.error(e);
      // エラー型
      reject("getHistoryData error");
    }
  });
};

// カテゴリ取得
const getCategoryData = async (num: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.debug("getCategoryData mode");
      // カテゴリクエリ
      const categoryQuery: string = `{
        products(first: ${num}) {
          nodes {
            category {
              id
              name
            }
          }
        }
      }`;
      // カテゴリ取得
      const { data } = await shopifyClient.request(categoryQuery);
      // ID重複削除
      const uniqueGids = data.products.nodes.map((dt: any) => dt.category.id);
      // カテゴリ名重複削除
      const uniqueData = data.products.nodes.map((dt: any) => dt.category.name);
      // 結果返し
      resolve({
        gids: removeDuplicatesWithFilter(uniqueGids),
        names: removeDuplicatesWithFilter(uniqueData),
      });

    } catch (e) {
      // エラー
      logger.error(e);
      // エラー型
      reject("getHistoryData error");
    }
  });
};

// Create a cart with a single item
const createCartWithItem = async (
  quantity: number,
  merchandiseId: string
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // query
      const cartCreateQuery: string = `mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            buyerIdentity {
              deliveryAddressPreferences {
                __typename
              }
              preferences {
                delivery {
                  deliveryMethod
                }
              }
            }
            attributes {
              key
              value
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
      `;
      // option
      const variable = {
        variables: {
          cartInput: {
            lines: [
              {
                quantity,
                merchandiseId: merchandiseId,
              },
            ],
          },
        },
      };
      // cart
       const { data } = await shopifyClient.request(cartCreateQuery, variable);
      // return
      resolve(data);

    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

// カート追加
const addToCart = async (cartId: string, merchandiseId: string, quantity: number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // カテゴリクエリ
      const addCartQuery: string = `
        mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              totalQuantity
            }
          }
        }
      `;
      // オプション
      const variable = {
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: merchandiseId,
              quantity,
            },
          ],
        },
      };
      // カテゴリ取得
      const { data } = await shopifyClient.request(addCartQuery, variable);
      // 結果返し
      resolve(data);

    } catch (e) {
      // エラー型
      reject("getHistoryData error");
    }
  });
};

// カート取得
const getAllCart = async (cartId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // カテゴリクエリ
      const getCartQuery: string = `
        query getCartLines($cartId: ID!, $cursor: String) {
          cart(id: $cartId) {
            id
            checkoutUrl
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100, after: $cursor) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      product {
                        id
                        title
                        images(first:1) {
                          edges {
                            node {
                              src
                            }
                          }
                        }
                      }
                      price {
                        amount
                      }
                    }
                  }
                }
                cursor
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        }
      `;
      
      // オプション
      const variable = {
        variables: {
          cartId,
        },
      };
      // カテゴリ取得
      const { data } = await shopifyClient.request(getCartQuery, variable);
      // 結果返し
      resolve(data);

    } catch (e) {
      // エラー型
      reject("getHistoryData error");
    }
  });
};

// 重複削除
const removeDuplicatesWithFilter = (arr: any[]): any[] => {
  return arr.filter((element, index) => {
    return arr.indexOf(element) === index;
  });
};

// 数値判定
const isNumber = (value: any): boolean => {
  return typeof value === "number";
}