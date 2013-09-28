var width = 1436,
    height = 783,
    url = 'https://www.amazon.co.jp/gp/product/B009V9C5FE',
    casper = require('casper').create({
        pageSettings: {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36 '
        },
        viewportSize: {
            width: width,
            height: height
        }
    }),
    args = casper.cli.options,
    id = args.id,
    pass = args.pass,
    isProd = !!args.isProd;

// 1-click注文押下
casper.start(url, function(){
    this.click('#oneClickSignInLinkID');
});

// ログイン
casper.then(function(){
    this.evaluate(function(id, pass){
        document.querySelector('#ap_email').value = id;
        document.querySelector('#ap_password').value = pass;
        document.querySelector('#signInSubmit-input').click();
    }, id, pass);
});

// 注文確定
casper.then(function(){
    if(isProd){
        this.evaluate(function() {
           document.querySelector('#oneClickBuyButton').click();
        });
    }else{
        capture(this);
        this.exit();
    }
});

// 注文確定画面保存
casper.then(function(){
    this.echo('Purchase!!');
    capture(this, 'purchase_screenshot.png');
    this.exit();
});

casper.run();

function capture(ctx, name){
    var fileName = name || 'debug_screenshot.png';
    ctx.capture(fileName, {
        top: 0,
        left: 0,
        width: width,
        height: height
    });
}