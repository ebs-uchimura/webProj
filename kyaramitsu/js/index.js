
async function wait(second) {
    return new Promise(resolve => setTimeout(resolve, 1000 * second));
}

// page transition
const page_transition = async function () {
    await wait(1);
    if(submitted){
        window.location = 'thanks.html';
    }
}
