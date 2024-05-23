export default function handler(req, res) {
    // Define the users array
    const users = [
        {
            id: 1,
            name: "jc sarmiento",
            email: "jacinto011200@gmail.com",
        },
        {
            id: 2,
            name: "Rineir Mercado",
            email: "reiniergmail.com",
        }
    ];

    // Define the response object
    const response = {
        success: true,
        data: users,
    };

    // Send the response with a 200 status code and the response object in JSON format
    res.status(200).json(response);
}
