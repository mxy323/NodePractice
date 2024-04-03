const replaceTemplate = require('./modules/replaceTemplate');

// const fs = require('fs')

// const textIn = fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)

// fs.readFile('./txt/read-this.txt','utf-8',(err,data)=>{console.log(data)})

//----------------------------------------------//
// create a simple Web Server、Route、Simple API
// const http = require('http')
// const fs = require('fs')
// const url = require('url')

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
// const dataObj=JSON.parse(data)

// const server=http.createServer((req,res)=>{
//    const pathname=req.url
//    if(pathname==='/overview'){
//     res.end('this is overview')
//    }else if (pathname==='/production'){
//     res.end('this is production')
//    }else if (pathname==='/api'){
//     res.writeHead(200,{'content-type':'application/json'})
//     res.end(data)
//    }
//    else{
//     res.writeHead(404)
//     res.end('not found this page')
//    }
// })

// server.listen(8000,'127.0.0.1',()=>{
//     console.log('start post')
// })

//----------------------------------------------//
// create a simple Web Server、Route、Simple API
const http = require('http');
const fs = require('fs');
const url = require('url');

const slugify = require('slugify');

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) =>
  slugify(el.productName, { replacement: '-', lower: true })
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log('query', query, 'pathname', pathname);

  //Overview
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join('');
    const outputOverview = templateOverview.replace(
      '{%PRODUCT_CARDS%}',
      cardHtml
    );
    res.end(outputOverview);

    //Production
  } else if (pathname === '/production') {
    //todo 添加产品ui
    res.end('this is production');

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  }
  //Not Found
  else {
    res.writeHead(404);
    res.end('not found this page');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('start post');
});
