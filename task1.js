class Good {
	constructor (id, name, description,
		sizes, price, available) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.sizes = Array.from(sizes);
		this.price = price;
		this.available = available;
	}
	setAvailable(isAvailable){
		this.available = isAvailable;
		return this.avilable;
	}
}

class GoodsList {
	goods =[];
	constructor(){
		this.filter = '';
		this.sortPrice = true; // true по умолчанию сортировка по цене 
		this.sortDir = true;// true - по умолчанию сортировка по возрастанию
	}
	
	get list(){
		if (this.sortPrice == true)
			if (this.sortDir == true)

				return this.goods.filter((good) => good.name.match(this.filter) ? 1:0).
					filter((good) => good.available?1:0).
					sort((a, b) => a.price - b.price);
		
			else

				return this.goods.filter((good) => good.name.match(this.filter) ? 1:0).
					filter((good) => good.available?1:0).
					sort((a, b) => b.price - a.price);
		
		else
			return [];
	}
	
	add(good){
		this.goods.push(good);
	}
	
	remove(id){
		for (let i = 0; i < this.goods.length; i++){
			if (this.goods[i]['id'] == id)
				this.goods.splice(i,1);
		}
	}
	
	setSortPrice(sortprice){
		this.sortPrice = sortprice;
	}
	
	setSortDirection(sd){//'up' - по возрастанию
					//'down' - по убыванию
		if (sd == 'up')
			this.sortDir = true;
		if (sd == 'down')
			this.sortDir = false;
	}
	
	setFilter(f){
		if (f.length>0)
			this.filter = new RegExp('appl','gi');
	}
	
	print(){
		for (let i = 0; i< this.goods.length; i++){
			console.log(this.goods[i]);
		}
	}
}

class BasketGood extends Good {
	constructor (good, amount){
		super(good.id, 
			good.name, 
			good.description, 
			good.sizes, 
			good.price, 
			good.available);
		
		this.amount = amount;
	}
}

class Basket {
	constructor(){
		this.goods = [];
	}
	
	get totalAmount(){
		return this.goods.reduce((total,elem) => total+=elem.amount,0);
	}
	
	get totalSum(){
		return this.goods.reduce((total,elem) => total+=elem.amount*elem.price,0);
	}
	
	add(basketGood){
		let isExist = false;
		this.goods.forEach(elem => {
			if (elem.id == basketGood.id) {
				elem.amount += basketGood.amount;
				isExist = true;
			}
		});
		
		if (isExist == false)
			this.goods.push(basketGood);
	}
	
	remove(good, amount){
		if (this.goods.length >0){
			this.goods.forEach((elem,index) => {
				if (elem.id == good.id) {
					elem.amount -= amount;
					if (elem.amount <= 0)
						this.goods.splice(index,1);
				}
			});
		}
	}
	
	clear(){
		this.goods.splice(0, goods.length);
	}
	
	removeUnavailable(){
		if (this.goods.length >0){
			this.goods.forEach((elem,index) => {
				if (elem.available === false) 
					this.goods.splice(index,1);
			});
			
		}
	}
}

good1 = new Good(1,'apples green','tasty apples',['small','medium','big'],200,true);
good2 = new Good(2,'apples red','tasty apples',['small','medium','big'],100,true);
good3 = new Good(3,'apples yellow','tasty apples',['small','medium','big'],50,true);
good4 = new Good(4,'oranges','pink oranges',['small','medium','big'],300,false);
good5 = new Good(5,'grapes','very good grapes',['small','medium','big'],150,true);

var gl = new GoodsList();
gl.add(good1);
gl.add(good2);
gl.add(good3);
gl.add(good4);
gl.add(good5);

gl.setFilter('appl');
console.log('Отфильтрованный список');
console.log(gl.list);

var bg1 = new BasketGood(good1, 5);
var bg2 = new BasketGood(good2, 3);
var bg3 = new BasketGood(good3, 1);
var bg4 = new BasketGood(good4, 2);
var bg5 = new BasketGood(good5, 2);
var bg6 = new BasketGood(good5, 2);

var basket =  new Basket();
basket.add(bg1);
basket.add(bg2);
basket.add(bg3);
basket.add(bg4);
basket.add(bg5);

basket.removeUnavailable();

console.log('Корзина с товарами');
console.log(basket.goods);
console.log('Всего товаров в корзине: %d', basket.totalAmount);
console.log('Сумма товаров в корзине: %d', basket.totalSum);

basket.remove(good1,1);
basket.remove(good1,1);
basket.remove(good2,5);
console.log('Корзина после удаления товаров');
console.log(basket.goods);
