export function removeSpace(data) {
    // const data = 'Lorem ipsum    dolor sit, amet consectetur adipisicing elit. Explicabo eaque fuga reiciendis dolorem perspiciatis beatae, amet ex eveniet quas. Voluptates tempore ducimus hic veniam libero earum minima, explicabo facilis rem impedit possimus expedita. Sed similique veniam repellendus aperiam accusamus eum porro ipsa autem nemo est?'
    if (data) {
       return data.split(' ').filter(word => word !== '').join(' ');
    }
}