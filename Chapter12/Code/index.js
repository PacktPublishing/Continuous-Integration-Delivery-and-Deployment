var express = require('express'),
    bodyParser = require('body-parser'),
    commandLineArgs = require('command-line-args'),
    js2xmlparser = require('js2xmlparser'),
    app = express();

app.use(bodyParser.json());

var todos = [{
    id: 1,
    description: 'Write a book.',
    status: 'In progress'
}, {
    id: 2,
    description: 'Celebrate.',
    status: 'New'
}];

app.get('/todo', function (req, res) {
    if (req.query.id) {
        var item = todos.find(t => t.id === +req.query.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).send('No such todo item.');
        }        
    } else {
        res.json(todos);
    }
});

app.get('/xml/todo', function (req, res) {
    if (req.query.id) {
        var item = todos.find(t => t.id === +req.query.id);
        if (item) {
            var xml = js2xmlparser.parse('todo', item);
            res.setHeader('content-type', 'text/xml');
            res.end(xml);
        } else {
            res.status(404).send('No such todo item.');
        }        
    } else {
        var xml = js2xmlparser.parse('todo', todos);
        res.setHeader('content-type', 'text/xml');
        res.end(xml);
    }
});

app.post('/todo', function (req, res) {
    if (req.body.description) {
        var newId = Math.max.apply(null, todos.map(t => t.id)) + 1;
        var newItem = {
            id: newId,
            description: req.body.description,
            status: req.body.status || 'New'
        };
        todos.push(newItem);
        res.json(newItem);
    } else {
        res.status(400).send('Description field is required.');
    }
});

app.put('/todo', function (req, res) {
    if (req.body.id) {
        var item = todos.find(t => t.id === +req.body.id);
        if (item) {
            item.description = req.body.description || item.description;
            item.status = req.body.status || item.status;
            res.json(item);
        } else {
            res.status(404).send('No such todo item.');
        }
    } else {
        res.status(400).send('Id field is required.');
    }
});

app.delete('/todo', function (req, res) {
    if (req.body.id) {
        var item = todos.find(t => t.id === +req.body.id);
        if (item) {
            todos.splice(todos.indexOf(item), 1);
            res.json(item);
        } else {
            res.status(404).send('No such todo item.');
        }
    } else {
        res.status(400).send('Id field is required.');
    }
});

var options = commandLineArgs({ name: 'port', defaultValue: 80 });
var server = app.listen(options.port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + options.port);