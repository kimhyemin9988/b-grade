class VideoSize {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export const changeVideoSize = () => {
    const width = window.outerWidth <= 550 ? window.innerWidth : 528;
    const height = window.outerWidth <= 550 ? ((window.innerWidth) / 16 * 9) : 297;
    let returnSize = new VideoSize(width, height);
    return returnSize;
};