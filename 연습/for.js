const letter = ['a', 'b', 'c', 'd']

// 일반적인 for문
for(let i=0; i<letter.length; i++) {
    console.log(letter[i]);
}

// forEach문
letter.forEach(function(f){
    console.log(f);
});

// forEach문(arrow function ver.)
letter.forEach(f => console.log(f));

// for-of문
for(const f of letter)
{
    console.log(f);
}