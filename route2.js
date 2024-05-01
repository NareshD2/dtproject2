const express = require('express');
const fs = require('fs');
const url = require('url');
const custommodule = require('./customModule.js');
const custommodule2 = require('./customModule2.js');

const app = express();

const mainpage = fs.readFileSync('./homepage.html');
const payment = fs.readFileSync('./payment.html','utf-8');
const trackorder = fs.readFileSync('./trackorder.html','utf-8');
const html = fs.readFileSync('./index2.html', 'utf-8');
const producthtml = fs.readFileSync('./productlist.html', 'utf-8');
const singleprodhtml = fs.readFileSync('./singleprod2.html', 'utf-8');
const login = fs.readFileSync('./login.html', 'utf-8');
const signup = fs.readFileSync('./signup.html', 'utf-8');
const adminhtml = fs.readFileSync('./admin.html', 'utf-8');
const adminsignuphtml = fs.readFileSync('./adminsignup.html', 'utf-8');
const additems = fs.readFileSync('./additems.html', 'utf-8');
const admininterface = fs.readFileSync('./items.html', 'utf-8');
let users = [];
fs.readFile('users.json', (err, data) => {
    if (err) {
        console.error('Error reading admins.json:', err);
        return; // Exit function if there's an error
    }
    try {
        users = JSON.parse(data); // Parse JSON data and assign to admins array
    } catch (parseError) {
        console.error('Error parsing JSON in admins.json:', parseError);
    }
    /*if (!err) {
        users = JSON.parse(data);
    }*/
});
let admins = []
fs.readFile('users.json', (err, data) => {
    if (err) {
        console.error('Error reading admins.json:', err);
        return; // Exit function if there's an error
    }
    try {
        admins = JSON.parse(data); // Parse JSON data and assign to admins array
    } catch (parseError) {
        console.error('Error parsing JSON in admins.json:', parseError);
    }
    /*if (!err) {
        admins = JSON.parse(data);
    }*/
});
//JSON.parse(fs.readFileSync('admins.json','utf-8'));
/*let admins = [];
fs.readFile('admins.json', (err, data) => {
    /*if (!err) {
        admins = JSON.parse(data);
    }
    if (err) {
        console.error('Error reading users.json:', err);
        return; // Exit function if there's an error
    }
    try {
        users = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing JSON in users.json:', parseError);
    }
});*/

app.use(express.urlencoded({ extended: true }));

function loadProductData(language) {
    return `./products${language}.json`;
}

/*mongoose.connect("mongodb+srv://garlapatidhatrinaresh:<password>@cluster0.wcqxqxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((conn) => {
    console.log("db connection successful")
}).catch((error) => {
    console.log("some error has occurred");
})*/

app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(login);
    res.end();
});

app.get('/login.html', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(login);
    res.end();
});

app.get('/signup.html', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(signup);
    res.end();
});
app.get('/admin.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(adminhtml);
    res.end();

});
app.get('/adminsignup.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(adminsignuphtml);
    res.end();


});
app.get('/payment.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(payment);
    res.end();

})
app.get('/additems.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(additems);
    res.end();


});
app.get('/paynow.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(trackorder);
    res.end();


});
app.post('/additems.html', (req, res) => {
    const { price, imagelink1, imagelink2, color, size, productname, videolink, modelnumber, feature, value } = req.body;
    const language = req.query.language || 'english';
    let productjson = JSON.parse(fs.readFileSync(loadProductData(language).replace('${language}', language), 'utf-8'));

    // Create a new product object
    const newProduct = {
        "id": productjson.length + 1, // Increment the id by 1
        "name": productname,
        "color": color,
        "ROM": value, // Assuming value corresponds to ROM based on the provided example
        "price": price,
        "modeName": feature, // Assuming feature corresponds to modeName based on the provided example
        "modelNumber": modelnumber,
        "size": size,
        "camera": videolink, // Assuming videolink corresponds to camera based on the provided example
        "Description": value, // Assuming value corresponds to Description based on the provided example
        "productImage": [imagelink1, imagelink2] // Assuming imagelink1 and imagelink2 are URLs for product images
    };

    // Push the new product object to the productjson array
    productjson.push(newProduct);

    // Write the updated productjson array back to the file
    fs.writeFileSync(loadProductData(language).replace('${language}', language), JSON.stringify(productjson));

    // Optionally, send a response back to the client
    res.send('Product added successfully');
});




/*app.post('/additems.html',(req,res)=>{
    const {price,imagelink1,imagelink2,color,size,productname,videolink,modelnumber,feature,value} = req.body;
    const language = req.query.language || 'english';
    let productjson = JSON.parse(fs.readFileSync(loadProductData(language).replace('${language}', language), 'utf-8'));

});*/
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        users.push({ username, password });
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing to users.json:', err);
                res.status(500).send('Error saving user data');
            } else {
                res.redirect('/signup.html?signupSuccess=true'); // Redirect to login page after signup
            }
        });
    } else {
        res.status(400).send('Username and password are required');
    }
});
app.post('/adminsignup', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        admins.push({ username, password });
        fs.writeFile('admins.json', JSON.stringify(admins), (err) => {
            if (err) {
                console.error('Error writing to users.json:', err);
                res.status(500).send('Error saving user data');
            } else {
                res.redirect('/adminsignup.html?adminsignupSuccess=true'); // Redirect to login page after signup
            }
        });
    } else {
        res.status(400).send('Username and password are required');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(html.replace('{{%CONTENT%}}', mainpage));
        //res.end();
    } else {
        // If login fails, redirect back to login page with a query parameter indicating failure
        res.redirect('/login.html?loginFailure=true');
    }
});
app.post('/admin', (req, res) => {
    const { username, password } = req.body;
    const user = admins.find(u => u.username === username && u.password === password);
    if (user) {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.write(admininterface);
    } else {
        // If login fails, redirect back to login page with a query parameter indicating failure
        res.redirect('/admin.html?loginFailure=true');
    }
});

/*app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', mainpage));
});*/

app.get('/about', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', 'you are in About page'));
});

app.get('/contact', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', 'you are in Contact page'));
});

app.get('/products', (req, res) => {
    const language = req.query.language || 'english';
    let productjson = JSON.parse(fs.readFileSync(loadProductData(language).replace('${language}', language), 'utf-8'));
    let producthtmlcopy = producthtml.slice();
    producthtmlcopy = producthtmlcopy.replace('{{%langu%}}', language);
    if (!req.query.id) {
        let producthtmlArray = productjson.map((prod) => {
            return custommodule.htmlreplace(producthtmlcopy, prod);
        });
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(html.replace('{{%CONTENT%}}', producthtmlArray.join(',')));
    } else {
        let product = productjson[req.query.id];
        let sam = custommodule2.htmlreplace(singleprodhtml, product);
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(html.replace('{{%CONTENT%}}', sam));
    }
});

app.use((req, res) => {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', 'Page not found'));
});


const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
