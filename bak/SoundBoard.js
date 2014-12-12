var SoundBoard = (function () {
    function SoundBoard(audioContext) {
        this.audioContext = audioContext;
    }
    SoundBoard.prototype.addOscilator = function (component) {
        oscilators.push(component);
    };
    return SoundBoard;
})();
//# sourceMappingURL=SoundBoard.js.map
