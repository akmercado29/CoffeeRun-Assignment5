var App = window.App;

QUnit.test('Initial Basic Test', function(assert) {
    assert.ok(1 == '1', 'Passed!');
});

QUnit.test('DataStore Test', function(assert) {
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, 'Passed, All orders showing!');
    ds.remove('james@bond.com');
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    },
        'Passed, Orders updated successfully');
    assert.deepEqual(ds.get('m@bond.com'), 'tea',
        'Passed, Correct order printed');
    assert.deepEqual(ds.get('james@bond.com'), undefined,
        'Passed, Orders updated successfully');
});

//QUnit test was not working propertly for the code in Figure 8.32 at first
//because the createOrder() function is only printing orders, not returning them
//Truck.js needs a method to return the orders
QUnit.test('Truck Test', function(assert) {
    var myTruck = new App.Truck('007', new App.DataStore());
    myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
    myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
    assert.deepEqual(myTruck.getAllOrders(),['me@goldfinger.com', 'dr@no.com', 'm@bond.com'], 'Passed, Correct Orders Printed');
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    assert.deepEqual(myTruck.getAllOrders(),['me@goldfinger.com'], 'Passed, Correct Orders Removed and Printed');
});
