

module.exports = {
    
    inchesToFeet: (inches) => {
        return ((inches - (inches % 12))/12 + "'" + (inches % 12 ? " " + Math.round(inches % 12) + '"' : ""));
    },

    feetToInches: (input) => {
        if(typeof(input) === "number") {
            return input * 12;
        }
        let data = input.split("'");
        data[1] = data.split('"')
        return data[0] * 12 + data[1][0];
    }

}
