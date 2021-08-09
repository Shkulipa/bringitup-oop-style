export default class BlockedBugClick {
    constructor(itemSelector) {
        try {
            this.elemBlocked = document.querySelectorAll(itemSelector);
        } catch (e) {}
    }

    blockBtn(btnSelector) {
        btnSelector.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
            })
        });
    }

    init() {
        try {
            this.blockBtn(this.elemBlocked);
        } catch (e) {
            console.log(e)
        }
    }
}