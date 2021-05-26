$(function(){

    //preliminaries
    $('h1').lettering();

    //color changer
    let clr = 90;
    $('#clr0').click(function(){
        clr-=20;
        $('body').css('filter',`hue-rotate(${clr}deg)`);
        $('img').css('filter',`hue-rotate(${360-clr}deg)`);
    });
    $('#clr1').click(function(){
        clr+=20;
        $('body').css('filter',`hue-rotate(${clr}deg)`);
        $('img').css('filter',`hue-rotate(${360-clr}deg)`);
    });

    //sidemenu animations
    let vR = 0;
    $('.sdm span').click(function(){
        if($('.sdm').width()===50){
            $('.sdm').animate({
                width: '+=265px'
            },200);
            $('.sdm .con').css('display','flex');
        } else {
            $('.sdm').animate({
                width: '-=265px'
            },200);
            $('.sdm .con').hide();
        }
        $('.sdm span').css('transform', `rotate(${vR+=45}deg)`);
    });

    //cards generator
    $('#nm').blur(function(){
        $('img').css('filter',`hue-rotate(${360-clr}deg)`);
        $('.grid').empty();
        let vals = [];
        for(let i=0; i<$(this).val(); i++){
            vals.push(i,i);
        }
        let mem = [], pos = [], valsL = vals.length, style = ``; //vals: cuántas parejas de cartas queremos (y cuántas cartas habrán será vals.length).

        for(let i=0; i<valsL; i++){
            $('.grid').append(`
            <div class="card" id="c${i}"><p><img src="img/i${vals.splice([Math.floor(Math.random()*vals.length)],1)}.png"></p></div>`);
        }

        if(valsL<10) {
            style+=`
            .grid{
                grid-template-columns: repeat(${valsL/2},1fr);
            }
            .card{
                min-width: ${95/(valsL/2)}%;
            }`;
        } else if(valsL>9 && valsL<17){
            style+=`
            .grid {
                grid-template-columns: repeat(4, 1fr);
            }
            .card{
                min-width: ${95/4}%;
            }
            @media (min-width: 1024px) {
                .grid{
                    width: 90%;
                    grid-template-columns: repeat(${valsL/2},1fr);
                }
                .card{
                    min-width: ${90/(valsL/2)}%;
                }
            }`;
            if(valsL===14){
                style+=`
                .card {
                    height: 135px;
                }
                @media (min-width: 1024px) {
                    .card {
                        height: 225px;
                    }
                }`;
            }else if(valsL===16){
                style+=`
                .card {
                    height: 130px;
                }
                @media (min-width: 1024px) {
                    .grid {
                        grid-template-columns: repeat(6,1fr);
                    }
                    .card {
                        height: 200px;
                        min-width: ${90/6}%;
                    }
                }`;
            }
        } else if(valsL>17){
            style+=`
            .grid {
                grid-template-columns: repeat(5, 1fr);
            }
            .card {
                height: 115px;
                min-width: ${90/5}%;
            }`;
            if(valsL===18){
                style+=`
                @media (min-width: 1024px) {
                    .grid {
                        width: 80%;
                        grid-template-columns: repeat(6,1fr);
                    }
                    .card {
                        height: 200px;
                        min-width: ${80/6}%;
                    }
                }`;
            } else if(valsL>19){
                style+=`
                @media (min-width: 1024px) {
                    .grid {
                        width: 90%;
                        grid-template-columns: repeat(8,1fr);
                    }
                    .card {
                        height: 200px;
                        min-width: ${90/8}%;
                    }
                }`;
            }
        }
        if(clr!==90){
            $('img').css('filter',`hue-rotate(${360-clr}deg)`);
        }
        $('.mq-styles').text(style);

        //verifier functions
        let color = function(){
            if(pos[0]!==pos[1]){
                $(`#${pos[0]}`).css('filter','brightness(.7)');
                $(`#${pos[1]}`).css('filter','brightness(.7)');
            } else {
                $(`#${pos[0]}`).css('background-color','rgb(0, 179, 0)');
            }
            mem=[];
            pos=[];
        }
        let del = function(){
            setTimeout(function(){
                $(`#${pos[0]}`).css('background-color','rgb(0, 179, 0)');
                $(`#${pos[1]}`).css('background-color','rgb(0, 179, 0)');
                $(`#${pos[0]} p`).hide();
                $(`#${pos[1]} p`).hide();
                mem=[];
                pos=[];
            }, 400);
        }

        $('.card').click(function(){
            let inT = $(this).html();
            mem.push(inT[inT.indexOf('img/')+5]);
            pos.push($(this).attr('id'));

            $(`#${pos[pos.length-1]} p`).css('display','flex');
            if(mem.length===2){
                mem[0]===mem[1] ? color() : del();
            }
        });
    });
});