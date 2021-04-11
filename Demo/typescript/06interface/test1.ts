interface Clothes {
  color: string;
  size: string;
  price: number
}

function getClothesInfo(clothes: Clothes) {
  console.log(clothes.color)
}

let myClothes: Clothes = {
  color: '#222222',
  size: '12',
  price: 1
}

getClothesInfo(myClothes)