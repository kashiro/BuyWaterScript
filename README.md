# BuyWaterScript

## Description
buy water on amazon.com by using casperjs

## Dependency

* [CasperJS](http://casperjs.org/)

## Usage

### debug

This mode does not buy water. only take a screenshot.

```
casperjs amazon_crystalgeyser.js --id=${id} --pass=${pass}
```

### execute purchase

```
casperjs amazon_crystalgeyser.js --id=${id} --pass=${pass} --isProd
```
