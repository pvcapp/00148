function chat_line(chatData=[], speed = 1000)
{
    for (let i=0; i< chatData.length; i++)
    {
        setTimeout(function(){
            toast(chatData[i],speed * 2);
        }, i * speed);
    }
}

setTimeou(function(){chat_line(['Xin chào!', 'Chúc bạn 1 ngày mới vui vẻ', 'Cảm ơn bạn đã lựa chọn Myhome!']);},5000);