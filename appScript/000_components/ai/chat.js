function chat_line(chatData=[], divId ='',speed = 2000)
{
    for (let i=0; i< chatData.length; i++)
    {
        setTimeout(function(){
            if (divId !=='')
            {
                $('#' + divId).innerText = chatData[i];
            }
            else
            {
                toast(chatData[i],speed * 2);
            }            
        }, i * speed);
    }
}

setTimeout(function(){
    chat_line(['Xin chào!', 'Chúc bạn 1 ngày mới vui vẻ', 'Cảm ơn bạn đã lựa chọn Myhome!']);
},5000);