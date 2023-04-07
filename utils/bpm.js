/**
 * @description: A class to translate BPM to a value between 0 and 1.
 * @example: const bpm = BPM.bpmInit(6);
 * @author:  @manuel-gutierrez
 * @param {number} bpm - The BPM to be translated.
 * @returns {number} - The BPM translated to a value between 0 and 1.
 * */
const min_bpm = 1;
class _BPM {
	constructor(bpm) {
		this.startTime = Date.now();
		this.currentTime; // The current time in milliseconds
		this.timePassed; // The time passed in milliseconds
		this.bpm = bpm || min_bpm; // the BPM of the animation otherwise the minimum BPM.
		this.bpmInterval = bpm / 60000; // The time interval between each beat in milliseconds
	}

	/*
	Helper function to get the sine wave point. 
	@return {number} - The BPM translated to a value between 0 and 1.
	*/
	getDataPoint() {
		return (
			(this.currentTime = Date.now()),
			(this.timePassed = this.currentTime - this.startTime),
			(Math.sin(this.timePassed * this.bpmInterval * 2 * Math.PI) + 1) / 2
		);
	}
}
export const bpmInit = (bpm) => {
	if (!bpm || bpm < 0) {
		throw new Error("A BPM value greater than 0 is required.");
	}
	return new _BPM(bpm);
};
