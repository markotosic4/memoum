export function permutation (arr){
    for(let i = arr.length -1; i >= 0; i--){
        let img = Math.floor(Math.random() * (i +1));
        let img2 = arr[i];
        arr[i] = arr[img]
        arr[img] = img2;
    }
    return arr;
}