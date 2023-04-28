const brain = require('brain.js');

// Define the network architecture and train the model
const net = new brain.NeuralNetwork();
net.train([
    { input: { diabetes: 1, highBloodPressure: 1, obesity: 1, age: 45, gender: 0, active: 1 }, output: { diet: "vegetarian" } },
    { input: { diabetes: 1, highBloodPressure: 0, obesity: 1, age: 35, gender: 1, active: 0 }, output: { diet: "vegan"} },
    { input: { diabetes: 0, highBloodPressure: 1, obesity: 0, age: 25, gender: 1, active: 1 }, output: { diet: "pescatarian"} },
    { input: { diabetes: 0, highBloodPressure: 0, obesity: 1, age: 50, gender: 0, active: 0 }, output: { diet: "low-carb"} },
    { input: { diabetes: 0, highBloodPressure: 1, obesity: 1, age: 55, gender: 1, active: 1 }, output: { diet: "Mediterranean"} },
    { input: { diabetes: 1, highBloodPressure: 0, obesity: 0, age: 30, gender: 0, active: 1 }, output: { diet: "plant-based"} },
    { input: { diabetes: 0, highBloodPressure: 0, obesity: 0, age: 40, gender: 1, active: 1 }, output: { diet: "balanced"} },
    { input: { diabetes: 1, highBloodPressure: 0, obesity: 1, age: 60, gender: 0, active: 0 }, output: { diet: "low-fat"} },
    { input: { diabetes: 0, highBloodPressure: 1, obesity: 0, age: 35, gender: 0, active: 1 }, output: { diet: "flexitarian"} },
    { input: { diabetes: 1, highBloodPressure: 1, obesity: 0, age: 50, gender: 1, active: 0 }, output: { diet: "DASH"} },
  ]);


// Define the endpoint that makes diet suggestions
exports.suggesDiet = (req, res) => {
    try {
        const input = req.body;

        const output = net.run(input);
        console.log(output); 



        // Return the output as a JSON response
        res.json(output);
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

};

