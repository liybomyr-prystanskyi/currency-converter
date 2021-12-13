function setDate(setState) {
    return event => {
        let date;
        try {
            date = new Date(event.target.value)
        } catch { }
        if (isNaN(date) == false && date < new Date()) { setState(date) };
    }
}
export default setDate;