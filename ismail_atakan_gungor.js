import { Selector } from 'testcafe';

fixture `Saucedemo`
    .page `https://www.saucedemo.com/`;

test('Scenario_1', async t => {
    await t
    // Registering site as Standard User
        .typeText('#user-name', 'standard_user')
        .typeText('#password', 'secret_sauce')
        .click('#login-button')
    // Creating variables 
        var price_list = [29.99, 15.99, 7.99, 9.99, 49.99, 15.99]
        var expected_total = 'Item total: $'
        var item_total = 0
    // In order to select 2 items randomly, 2 random numbers are created
        var rand_1 = parseInt(6 * Math.random(), 10)
        var rand_2 = parseInt(6 * Math.random(), 10)
    // Since an item cannot be selected twice, random numbers should not be equal.
    // Therefore, a small check mechanism is created.
        do 
        {
            rand_2 = parseInt(6 * Math.random(), 10)
        }while (rand_1 != rand_2);
    // In order to use these random numbers in a loop, an array is created with these values
        var arr = [rand_1, rand_2]
    // Loop variable is created
        var n = 0
    // Loop contains 6 statements where items are added to cart
        while(n<2) 
        {
            if(arr[n] == 0) 
                {
                await t
                .click('#add-to-cart-sauce-labs-backpack')   
                }
            else if (arr[n] == 1)
                {
                await t
                .click('#add-to-cart-sauce-labs-bolt-t-shirt')
                }
            else if (arr[n] == 2)
                {
                await t
                .click('#add-to-cart-sauce-labs-onesie')
                }
            else if (arr[n] == 3)
                {    
                await t
                .click('#add-to-cart-sauce-labs-bike-light') 
                }
            else if(arr[n] == 4) {      
                await t
                .click('#add-to-cart-sauce-labs-fleece-jacket')}
            else
                {
                await t
                .click('#add-to-cart-test\.allthethings\(\)-t-shirt-\(red\)')
                }
            n++
        }
    // Item price and expected value is created
        item_total = price_list[rand_1] + price_list[rand_2]
        expected_total = expected_total + item_total;
        await t
    // Forwarding to checkout
        .click(Selector('#shopping_cart_container span').withText('2'))
        .click('#checkout')
    // In order to continue to summary, necessary fields are filled
        .typeText('#first-name', 'standard')
        .typeText('#last-name', 'user')
        .typeText('#postal-code', '11111')
        .click('#continue')
    // Expected Result
        .expect(Selector('#checkout_summary_container div').innerText).eql(expected_total);            
    });

