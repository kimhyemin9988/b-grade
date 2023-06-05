class VideoSize {
    width: string;
    height: string;
    constructor(width: string, height: string) {
        this.width = width;
        this.height = height;
    }
}

export const changeVideoSize = () => {
    const width = window.outerWidth <= 550 ? window.innerWidth.toString() : '528';
    const height = window.outerWidth <= 550 ? ((window.innerWidth) / 16 * 9).toString() : '297';
    let returnSize = new VideoSize(width, height);
    return returnSize;
};