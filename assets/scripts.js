let x = false
let max = 0
let zorluq = 0
let containerDiv = document.querySelector('.container')

let difficulty ;
let clasarr = ['left','mid','right']


let zamanId


console.log(containerDiv)

$(document).ready(function() {
    $('#controls .btn').click(function() {
        $(this).css('display' , 'none')
        $('.select').css('display', 'flex');
        x = true
    });
    
    $('#controls .easy').click(function (){
        containerDiv.innerHTML = ''
        $('.container').css('display', 'flex')
        zorluq = 40
        max = 8
        difficulty = 'Easy'
        generateSudoku()
        click()
        $('.select').css('display', 'none')
        $('#controls').css('display', 'none');
    })
    $('#controls .normal').click(function (){
        containerDiv.innerHTML = ''
        $('.container').css('display', 'flex')
        difficulty = 'Normal'
        zorluq = 32
        max = 6
        generateSudoku()
        click()
        $('.select').css('display', 'none')
        $('#controls').css('display', 'none');
    })
    $('#controls .hard').click(function (){
        difficulty = 'Hard'
        containerDiv.innerHTML = ''
        $('.container').css('display', 'flex')
        zorluq = 24
        max = 4
        generateSudoku()
        click()
        $('.select').css('display', 'none')
        $('#controls').css('display', 'none');
    })
});
let array = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];


function generateSudoku() {
    let nav = document.createElement('nav')
    containerDiv.appendChild(nav)

    for(let i = 0; i < 3; i++){
        let div = document.createElement('div')
        console.log(clasarr[i])
        div.setAttribute('class',clasarr[i])
        nav.appendChild(div)
    }
    
    
    
    let left = document.querySelector('.left')
    let mid = document.querySelector('.mid')
    let right = document.querySelector('.right')
    let p = document.createElement('p')
    let h3 = document.createElement('h3')
    
    p.innerHTML = 'Difficulty'
    h3.innerHTML = difficulty
    left.appendChild(p)
    left.appendChild(h3)
    let div = document.createElement('div')
    div.setAttribute('id','time')
    div.innerHTML = '00:00'
    mid.appendChild(div)
    mid.style.cssText = 'display: flex; gap: 10px;'
    let saniye = 0
    const time = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const sec = seconds % 60
        let timeString = ''
        if(hours > 0){
            timeString += hours.toString().padStart(2,0) + ':'
        }
            timeString += minutes.toString().padStart(2,0) + ':'
            timeString += sec.toString().padStart(2,0)
        
            return timeString
    }

    const updateTimer = () => {
        saniye++
        let zaman = document.querySelector('#time')
        div.textContent = time(saniye)
    }
    zamanId = setInterval(updateTimer,1000)

    let icon = document.createElement('i')
    icon.setAttribute('class', 'fa-solid fa-pause')
    mid.appendChild(icon)
    
    for(let i = 3; i > 0; i--){
        let icon = document.createElement('i')
        icon.setAttribute('class','fa-solid fa-heart')
        right.appendChild(icon)
    }
    

    let filled = false
    let a = 0
    let z = 0
    let arrLength = array.length
    
    const isFilled = (row,col,num) =>{
        let startRow = row - row % 3
        let starttCol = col - col % 3
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if (array[i + startRow][j + starttCol] === num){
                    return false
                }
                
            }
        }
        
        for(let i = 0; i < 9; i++){
            if(array[row][i] == num || array[i][col] == num ){
                return false
            } 
        }

        return true
    }
    const FisherYatesShuffleArrey = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    const sudoku = () =>{
        
        for(let row = 0; row < arrLength; row++){
            
            for(let col = 0; col < arrLength; col++){
                
                if(array[row][col] === 0){
                    let numbers = FisherYatesShuffleArrey([1,2,3,4,5,6,7,8,9])
                    for( let num of numbers){
                        if(isFilled(row,col,num)){
                            array[row][col] = num
                            
                            if(sudoku()){
                                return true
                            }
                            array[row][col] = 0
                        }
                        
                    }
                    return false
                }
                
            }
            
        }
        return true
    }
    sudoku()

    const show = () => {
        let x = 0
        let sum = 0;
        let reqem = [];
        let neQeder = [];
        for(let i = 0; i < 9; i++){
            let num = Math.ceil(Math.random() * 9);
            if(!reqem.includes(num)){
                reqem.push(num);
            }else{
                i -= 1;
            }
        }
        while(sum < zorluq){
            let num = Math.round(Math.random() * max);
            sum += num
            neQeder.push(num)
            
            if(sum > zorluq || neQeder.length > 9){
                neQeder = []
                sum = 0
                
            }else if(sum === zorluq){
                
                if(zorluq === 40){
                    if (neQeder.length < 8){
                        neQeder = []
                        sum = 0
                    } else{
                        break
                    }
                }else if(zorluq === 32){
                    if (neQeder.length < 8 || !neQeder.includes(0)){
                        neQeder = []
                        sum = 0
                    } else{
                        break
                    }
                }else{
                    
                    neQeder.forEach(e => {
                        if(e === 0){
                            x += 1
                        }
                    })
                    if(x < 2){
                        if(neQeder.length <= 8 && neQeder.includes(0)){
                            break
                        }else{
                            neQeder = []
                            sum = 0
                            x = 0
                        }
                    }else {
                        break
                    }
                }
            }
            
        }
        
        let ul = document.querySelectorAll('ul')
        let li = document.querySelectorAll('li')
        for(let i = 0; i < neQeder.length; i++){
            let z = []
            for(let j = 0; j < neQeder[i]; j++){
                let random = Math.floor(Math.random() * 9)
                if(!z.includes(random)){
                    z.push(random)
                }else{
                    j -= 1
                }
            }
            
            
            for(let index = 0; index < z.length; index++){
                let li1 = ul[z[index]].querySelectorAll('li')
                for(let n = 0; n < 9; n++){
                    if(reqem[i] === array[z[index]][n]){
                        li1[n].innerText = reqem[i]
                    }
                }
            }
            
        }
    }
    
    ulYarat()
    show()
    
        
        console.log(array)
}
let ulYarat = () =>{
    for(let row = 0; row < 9; row++){
        let ul = document.createElement('ul')
        ul.setAttribute('class','sudoku')
        for(let col = 0; col < 9; col++){
            let li = document.createElement('li')
            
            ul.appendChild(li)
        }
        containerDiv.appendChild(ul)
    }
    let ul = document.createElement('ul')
    let div = document.createElement('div')
    ul.setAttribute('class', 'reqemler')
    for(let i =0; i < 9; i++){
        let li = document.createElement('li')
        li.innerText = i+1
        li.setAttribute('id',i+1)
        ul.appendChild(li)
    }
    ul.style.marginTop = '40px'
    div.appendChild(ul)
    containerDiv.appendChild(div)
}
let healt = 0
let yazilan = [[],[],[],[],[],[],[],[],[]]
const click = () => {
    let reqemler = document.querySelector('.reqemler')
    let c;

    let a;
    let b;
    
    let li3 = reqemler.querySelectorAll('li')
    const playSound = (sound) => {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
    const display = document.createElement('div');
    display.className = 'value-display';
    document.body.appendChild(display);

    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;
    
        if (c !== undefined) {
            display.style.left = `${x + 10}px`; // Mouse pointer'ının 10px sağında
            display.style.top = `${y + 10}px`; // Mouse pointer'ının 10px altında
            display.innerHTML = c; // c değişkeninin değeri
            display.style.display = 'block'; // Görünür yap
        } else {
            display.style.display = 'none'; // Gizle
        }
    });
    let say = 0
    let bool = true
    const beepSound = new Audio('./assets/playernocanselect-37979.mp3')
    let ul = document.querySelectorAll('.sudoku')
    document.addEventListener('click', (e)=>{
        
    
        
        isInsideli = false
        for(let i = 0; i < 9; i++){
            
            
            if(li3[i].contains(e.target)){
                
                if(c != undefined){
                    for(let j = 0; j < 9; j++){
                        li3[j].style.background = '#898484'
                    }
                    if(c == li3[i].innerHTML){
                        c = undefined
                    }else{
                        c = li3[i].innerHTML
                        li3[i].style.background = 'white'
                    }
                }else{
                    li3[i].style.background = 'white'
                    c = li3[i].innerHTML
                }
            }
        }
        
        let z;
        for(let i = 0; i < 9; i++){
            ul[i].style.background = '#898484'
            let li = ul[i].querySelectorAll('li')
            for(let j = 0; j < 9; j++){
                
                if(li[j].contains(e.target)){

                    z = li[j].innerHTML
                    isInsideli = true
                    for(let i = 0; i < 9; i++){
                        let ul = document.querySelectorAll('.sudoku')
                        for(let j = 0; j < 9; j++){
                            let li = ul[i].querySelectorAll('li')
                            
                                
                                if(yazilan[i].includes(j)){
                                    if(li[j].innerHTML == array[i][j]){
                                        li[j].style.color = 'green'
                                        li[j].style.fontWeight = '400'
                                        if(li[j].innerHTML == z){
                                            li[j].style.fontWeight = 'bold'
                                        }
                                    }else{
                                        li[j].style.color = 'red'
                                        li[j].style.fontWeight = '400'
                                    }
                                }else{
                                    li[j].style.fontWeight = '400'
                                    li[j].style.color = 'lightblue'
                                }
                        }
                    }
                    if(c != array[i][j] && c != undefined && c != li[j].innerHTML  && li[j].innerHTML != array[i][j] ){
                        document.querySelectorAll('.fa-heart')[healt].style.color = 'rgb(181, 177, 177)'
                        healt += 1
                        
                    }
                    if((isInsideli)){
                        for(let i = 0; i < 9; i++){
                            let li = ul[i].querySelectorAll('li')
                            for(let j = 0; j < 9; j++){
                                li[j].style.background = '#898484'
                            }
                        }
                        
                        li.forEach((e,i) => {
                            e.style.background = '#D0EFFF'
                        })
                        ul.forEach(e => {
                            ulLI = e.querySelectorAll('li')[j]
                            if(ulLI){
                                ulLI.style.background = '#D0EFFF'
                            }
                        })
                        
                        if(c != undefined && +li[j].innerHTML != array[i][j]){
                            
                            li[j].innerHTML = c
                            if(!yazilan[i].includes(j)){
                                yazilan[i].push(j)
                            }
                            if(c != array[i][j]){
                                
                                li[j].style.color = 'red'
                                
                                
                            }else if(c == array[i][j]){
                                li[j].style.color = 'green'
                            }
                            
                            
                        }else if(c != undefined && li[j].innerHTML == array[i][j]){
                            playSound(beepSound)
                        }
                        
                        for(let i = 0; i < 9; i++){
                            let x = ul[i].querySelectorAll('li')
                            for(let j = 0; j < 9; j++){
                                    
                                    if(x[j].contains(e.target)){
                                        if(x[j].innerHTML != array[i][j]){
                                            bool = false
                                            
                                            
                                        }else bool = true
                                        
                                    }
                                    
                                    if(!bool){
                                        
                                    }
                                    
                                    
                            }
                        }
                        
                    }
                }
                
            }
        }
        for(let i = 0; i < 9; i++){
            let x = ul[i].querySelectorAll('li')
            for(let j = 0; j < 9; j++){
                if (x[j].innerHTML === z && bool){
                    if(!yazilan[i].includes(j)){
                        x[j].style.color = '#00008B'
                        x[j].style.fontWeight = 'bold'
                    }
                }else if (x[j].innerHTML === z && bool){
                
                        x[j].style.color = '#00008B'
                        x[j].style.fontWeight = 'bold'
                    
                }
            }
        }
        
        if(!isInsideli){
            ul.forEach((ulElement) => {
                ulElement.querySelectorAll('li').forEach((e) => {
                    e.style.background = '#898484'
                })
                for(let i = 0; i < 9; i++){
                    let x = ul[i].querySelectorAll('li')
                    for(let j = 0; j < 9; j++){
                        if(x[j].innerHTML == array[i][j] && yazilan[i].includes[j]){
                        x[j].style.color = 'lightblue'
                        x[j].style.fontWeight = '400'
                        }
                    }
                }
            })
        }
        if(healt === 3){
            c = undefined
            let div = document.querySelector('#time')
            saniye = 0
            clearInterval(zamanId)
            $(document).ready(function() {
                $('#controls .btn').css('display','block')
                $('.container').css('display', 'none')
                $('#controls').css('display', 'flex');
                healt = 0
            })
            
        }
    })
    
    
    
}

