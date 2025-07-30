
//resizeScreen(); //처음 실행시 창 크기에 따라 디자인 적용
window.onresize = resizeScreen; // 창크기 조절 시 디자인 적용

function resizeScreen(){
    let width = window.innerWidth;
    if(width >= 1200){
        pcScreen();
    }else if(width >= 744){
        tabletScreen();
    }else if(width >= 375){
        mobileScreen();
    }else{
        //고려하지 않는다.
    }
}

const bodyClassList = document.querySelector('body').classList;

function pcScreen(){
    bodyClassList.add('pc');
    bodyClassList.remove('tablet');
    bodyClassList.remove('moblie');
}

function tabletScreen(){
    bodyClassList.remove('pc');
    bodyClassList.add('tablet');
    bodyClassList.remove('moblie');
}

function mobileScreen(){
    bodyClassList.remove('pc');
    bodyClassList.remove('tablet');
    bodyClassList.add('moblie');
}