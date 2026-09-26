var PVC_Fns_CN_IdTextBoxHienTai = '';
  var PVC_Fns_CN_FormatHienTai = '';
  const PVC_Fns_CN_Div_CheContainer = document.createElement('div');
	PVC_Fns_CN_Div_CheContainer.style.position = 'fixed';
	PVC_Fns_CN_Div_CheContainer.style.left = '0px';
	PVC_Fns_CN_Div_CheContainer.style.top = '0px';
	PVC_Fns_CN_Div_CheContainer.style.backgroundColor = 'rgba(255,255,255,0.45)';
	PVC_Fns_CN_Div_CheContainer.style.width = '100%';
	PVC_Fns_CN_Div_CheContainer.style.height = '100%';
	PVC_Fns_CN_Div_CheContainer.style.zIndex = '1000';
	PVC_Fns_CN_Div_CheContainer.style.display = 'none';
	PVC_Fns_CN_Div_CheContainer.id = 'PVC_Fns_CN_Div_CheContainer';
	PVC_Fns_CN_Div_CheContainer.addEventListener('click', function()
	{
		PVC_Fns_HideLichThang();
	});

  document.body.appendChild(PVC_Fns_CN_Div_CheContainer);

const PVC_Fns_CN_Div_Container = document.createElement('div');
	PVC_Fns_CN_Div_Container.id = 'PVC_Fns_CN_Div_Container';
  PVC_Fns_CN_Div_Container.className =  "PVC_Fns_CN_Div_Container";
	PVC_Fns_CN_Div_Container.style.textAlign = 'center';
	PVC_Fns_CN_Div_Container.style.display = 'none';
		const tbl_bg = document.createElement('table');
		tbl_bg.style.width = '100%';
		tbl_bg.style.border = '0';
			const tbl_bg_tr1 = document.createElement('tr');
				const tbl_bg_tr1_td1 = document.createElement('td');
				tbl_bg_tr1_td1.addEventListener('click', function()
				{
					PVC_Fns_HideLichThang();
				});				
			tbl_bg_tr1.appendChild(tbl_bg_tr1_td1);
				const tbl_bg_tr1_td2 = document.createElement('td');
				tbl_bg_tr1_td2.style.width = '250px';
					const divNoiDungChinh = document.createElement('div');
					divNoiDungChinh.className = 'PVC_Fns_CN_Div';
					divNoiDungChinh.style.background = 'white';
					divNoiDungChinh.style.borderRadius = '5px';
					divNoiDungChinh.style.border = '1px solid rgba(0,0,0,0.3)';
					divNoiDungChinh.style.padding = '2px';
						const tblCaption = document.createElement('table');
						tblCaption.style.width = '100%';
							const tablCaption_tr1 = document.createElement('tr');
								const tablCaption_tr1_td1 = document.createElement('td');
								tablCaption_tr1_td1.style.textAlign = 'center';
								tablCaption_tr1_td1.innerHTML = '<div style="color:var(--primary);text-align:center;width:98%;" id="PVC_Fns_CN_Caption">Chọn ngày</div>';
							tablCaption_tr1.appendChild(tablCaption_tr1_td1);
                
								const tablCaption_tr1_td2 = document.createElement('td');
								tablCaption_tr1_td2.style.textAlign = 'right';
									const inputGiaTriHienTai = document.createElement('input');
									inputGiaTriHienTai.type = 'text';
									inputGiaTriHienTai.id = 'PVC_Fns_CN_GiaTriHienTai';
									inputGiaTriHienTai.value = '';
									inputGiaTriHienTai.className = 'InputBox';
									inputGiaTriHienTai.style.width = '110px';
									inputGiaTriHienTai.addEventListener('dblclick', function()	
									{
										PVC_Fns_HideLichThang();
									});

                  
									inputGiaTriHienTai.addEventListener('keyup', function(e)
										{
											if (e.key === 'Enter' || e.keyCode === 13) 
											{
												PVC_Fns_HideLichThang();
											}
											else
											{
												let idTextBoxHienTai = PVC_Fns_CN_IdTextBoxHienTai;
												let textBoxHienTai = document.getElementById(idTextBoxHienTai);
												let giaTriHienTaiValue = inputGiaTriHienTai.value;
												textBoxHienTai.value = giaTriHienTaiValue;
												let ntn = tachNgayThang(textBoxHienTai.value);
												if (ntn.ok == false)
												{
													
												}
												else
												{
													PVC_Fns_LoadLichThang(ntn.ngay, ntn.thang, ntn.nam, 0);													
												}
											}
										}
									);
                  
								
								tablCaption_tr1_td2.appendChild(inputGiaTriHienTai);
							tablCaption_tr1.appendChild(tablCaption_tr1_td2);
						tblCaption.appendChild(tablCaption_tr1);
						
            
						
						const divThang = document.createElement('div');
						divThang.className = 'PVC_Fns_CN_Thang_Div';
              let divThang_tbl = document.createElement('table');
              divThang_tbl.style.width = '100%';
                let divThang_tbl_tr = document.createElement('tr');
                divThang_tbl_tr.style.textAlign = 'center';
                  let divThang_tbl_tr_td1 = document.createElement('td');
                  divThang_tbl_tr_td1.style.width = '10%';
                    let divThang_tbl_tr_td1_div1 = document.createElement('div');
                    divThang_tbl_tr_td1_div1.className = "PVC_Fns_CN_Thang_NextBack";
                    divThang_tbl_tr_td1_div1.addEventListener('click',function(){
                      PVC_Fns_CN_ChuyenThangTruoc();
                    });
                    divThang_tbl_tr_td1_div1.innerHTML = `<svg width="7" height="16" style="width:7px;height:16px;">
															<path stroke="black" fill="none" d="M6,5 l-5,3 l5,3" />
														</svg>`;
                  divThang_tbl_tr_td1.appendChild(divThang_tbl_tr_td1_div1);


                  let divThang_tbl_tr_td2 = document.createElement('td');
                    let divThang_tbl_tr_td2_div1 = document.createElement('div');
                    divThang_tbl_tr_td2_div1.id = "PVC_Fns_CN_Thang_NoiDung";
                    divThang_tbl_tr_td2_div1.className = "PVC_Fns_CN_Thang_NoiDung";
                    divThang_tbl_tr_td2_div1.innerText = "Tháng 12/2023";

                    let divThang_tbl_tr_td2_input1 = document.createElement('input');
                    divThang_tbl_tr_td2_input1.value = "0";
                    divThang_tbl_tr_td2_input1.type = "number";
                    divThang_tbl_tr_td2_input1.style.display = "none";
                    divThang_tbl_tr_td2_input1.id = "PVC_Fns_CN_NgayHienTai";


                    let divThang_tbl_tr_td2_input2 = document.createElement('input');
                    divThang_tbl_tr_td2_input2.value = "0";
                    divThang_tbl_tr_td2_input2.type = "number";
                    divThang_tbl_tr_td2_input2.style.display = "none";
                    divThang_tbl_tr_td2_input2.id = "PVC_Fns_CN_ThangHienTai";


                    let divThang_tbl_tr_td2_input3 = document.createElement('input');
                    divThang_tbl_tr_td2_input3.value = "0";
                    divThang_tbl_tr_td2_input3.type = "number";
                    divThang_tbl_tr_td2_input3.style.display = "none";
                    divThang_tbl_tr_td2_input3.id = "PVC_Fns_CN_NamHienTai";

                  divThang_tbl_tr_td2.appendChild(divThang_tbl_tr_td2_div1);
                  divThang_tbl_tr_td2.appendChild(divThang_tbl_tr_td2_input1);
                  divThang_tbl_tr_td2.appendChild(divThang_tbl_tr_td2_input2);
                  divThang_tbl_tr_td2.appendChild(divThang_tbl_tr_td2_input3);


                  let divThang_tbl_tr_td3 = document.createElement('td');
                  divThang_tbl_tr_td3.style.width = '10%';
                    let divThang_tbl_tr_td3_div1 = document.createElement('div');
                    divThang_tbl_tr_td3_div1.className = "PVC_Fns_CN_Thang_NextBack";
                    divThang_tbl_tr_td3_div1.addEventListener('click',function(){
                      PVC_Fns_CN_ChuyenThangSau();
                    });
                    divThang_tbl_tr_td3_div1.innerHTML = `<svg width="7" height="16" style="width:7px;height:16px;">
															<path stroke="black" fill="none" d="M1,5 l5,3 l-5,3" />
														</svg>`;
                  divThang_tbl_tr_td3.appendChild(divThang_tbl_tr_td3_div1);
                divThang_tbl_tr.appendChild(divThang_tbl_tr_td1);
                divThang_tbl_tr.appendChild(divThang_tbl_tr_td2);
                divThang_tbl_tr.appendChild(divThang_tbl_tr_td3);
              divThang_tbl.appendChild(divThang_tbl_tr);
						divThang.appendChild(divThang_tbl);	
						
            const PVC_Fns_CN_Table_OValue = document.createElement('div');
						PVC_Fns_CN_Table_OValue.style.display = 'none';
						PVC_Fns_CN_Table_OValue.id = 'PVC_Fns_CN_Table_OValue';

						const PVC_Fns_CN_Table = document.createElement('table');
						PVC_Fns_CN_Table.id = 'PVC_Fns_CN_Table';
						PVC_Fns_CN_Table.className = 'PVC_Fns_CN_Table';
							var Thu_Array = ["T2","T3","T4","T5","T6","T7","CN"];
							let tr0 = document.createElement('tr');
							tr0.style.textAlign = 'center';
							for (var i=0;i<7;i++)
							{
								let tdtd = document.createElement('td');
								tdtd.classList.add('PVC_Fns_CN_Thu_Div');
								tdtd.innerText = Thu_Array[i];
								tr0.appendChild(tdtd);
							}
							PVC_Fns_CN_Table.appendChild(tr0);
							
							
							for (var i=1;i<7;i++)
							{
								let tri = document.createElement('tr');
								tri.style.textAlign = 'center';
								tri.id = 'PVC_Fns_CN_Table_Hang' + i;
								for (var j=1;j<8;j++)
								{
									var CN_Table_OThu = (i-1)*7 + j;
									let tdi = document.createElement('td');
									tdi.classList.add('PVC_Fns_CN_Ngay_Div');
									tdi.id = 'PVC_Fns_CN_Table_OThu' + CN_Table_OThu;
                  tdi.dataset.index = CN_Table_OThu;
                    let status = document.createElement('input');
                    status.type = 'number';
                    status.style.display = 'none';
                    status.value = '0';
                    status.id = 'PVC_Fns_CN_Table_OThu' + CN_Table_OThu +'_Value';
                    PVC_Fns_CN_Table_OValue.appendChild(status);
									tdi.addEventListener('click', function()
									{
										let index = this.dataset.index;
                    PVC_Fns_CN_CN(document.getElementById('PVC_Fns_CN_Table_OThu' + index + '_Value').value);
									});
									tri.appendChild(tdi);
								}
								
								PVC_Fns_CN_Table.appendChild(tri);
							}

						
          divNoiDungChinh.appendChild(PVC_Fns_CN_Table_OValue);
					divNoiDungChinh.appendChild(divThang);
					divNoiDungChinh.appendChild(tblCaption);          
					divNoiDungChinh.appendChild(PVC_Fns_CN_Table);
					
				tbl_bg_tr1_td2.appendChild(divNoiDungChinh);
			tbl_bg_tr1.appendChild(tbl_bg_tr1_td2);


			const tbl_bg_tr1_td3 = document.createElement('td');
				tbl_bg_tr1_td3.addEventListener('click', function()
				{
					PVC_Fns_HideLichThang();
				});				
			tbl_bg_tr1.appendChild(tbl_bg_tr1_td3);
		tbl_bg.appendChild(tbl_bg_tr1);
	PVC_Fns_CN_Div_Container.appendChild(tbl_bg);
  document.body.appendChild(PVC_Fns_CN_Div_Container);
  

	  function isNumber(so)
		{
			return !isNaN(so) && so !==null && so!=='' && so!=='undefined' && so!=='NaN';
		}


		function tachNgayThang(ntn) 
		{
			let kq = { ok: false, ngay: '', thang: '', nam: '' };
			let d = new Date();

			if (ntn.length === 0) {
				// Không làm gì
			} else {
				let tach = ntn.split('/');
				if (tach.length === 3) {
					if (
						isNumber(tach[0]) &&
						isNumber(tach[1]) &&
						isNumber(tach[2]) &&
						tach[0].length < 3 &&
						tach[1].length < 3 &&
						tach[2].length === 4
					) {
						kq.ngay = tach[0];
						kq.thang = tach[1];
						kq.nam = tach[2];
						kq.ok = true;
					}
				} else if (tach.length === 2) {
					if (
						isNumber(tach[0]) &&
						isNumber(tach[1]) &&
						tach[1].length === 4 &&
						tach[0].length < 3
					) {
						kq.ngay = d.getDate().toString().padStart(2, '0');
						kq.thang = tach[0];
						kq.nam = tach[1];
						kq.ok = true;
					} else if (
						isNumber(tach[0]) &&
						isNumber(tach[1]) &&
						tach[0].length < 3 &&
						tach[1].length < 3
					) {
						kq.ngay = tach[0];
						kq.thang = tach[1];
						kq.nam = d.getFullYear().toString();
						kq.ok = true;
					}
				} else if (tach.length === 1) {
					if (isNumber(tach[0])) {
						if (tach[0].length === 4) {
							kq.ngay = d.getDate().toString().padStart(2, '0');
							kq.thang = (d.getMonth() + 1).toString().padStart(2, '0');
							kq.nam = tach[0];
						} else {
							kq.ngay = '01';
							kq.thang = '01';
							kq.nam = d.getFullYear().toString();
						}
						kq.ok = true;
					}
				}
			}

			return kq;
		}
		
		
    function PVC_Fns_HideLichThang()
    {
        document.getElementById('PVC_Fns_CN_Div_Container').style.display = 'none';
        document.getElementById('PVC_Fns_CN_Div_CheContainer').style.display = 'none';
        var Id = PVC_Fns_CN_IdTextBoxHienTai;
    document.getElementById(Id).focus();
    }
	    
		function SoNgayTrongThang(Thang,Nam)
		{
			if (Thang == 1 || Thang == 3 || Thang == 5 || Thang == 7 || Thang == 8 || Thang == 10 || Thang == 12)
			{
				var SoNgayTrongThang = 31;
			}
			else if (Thang == 4 || Thang == 6 || Thang == 9 || Thang == 11)
			{
				var SoNgayTrongThang = 30;
			}
			else
			{
				if (Nam % 4 ==0) {var SoNgayTrongThang = 29;}
				else {var SoNgayTrongThang = 28;}
			}
			return SoNgayTrongThang;
		}
		
		function PVC_Fns_LoadLichThang(Ngay,Thang,Nam,capNhatGiaTriHienTai = 1)
		{
			let ngay2 = Ngay < 10 ? '0' + parseInt(Ngay): Ngay;
			let thang2 = Thang < 10 ? '0' + parseInt(Thang) : Thang;
			if (capNhatGiaTriHienTai == 1)
			{
				document.getElementById('PVC_Fns_CN_GiaTriHienTai').value = ngay2 + '/' + thang2 + '/' + Nam;
			}
			document.getElementById('PVC_Fns_CN_NgayHienTai').value = Ngay;
			document.getElementById('PVC_Fns_CN_ThangHienTai').value = Thang;
			document.getElementById('PVC_Fns_CN_NamHienTai').value = Nam;
			
			document.getElementById('PVC_Fns_CN_Thang_NoiDung').innerText = 'Tháng ' + Thang + ' ' + Nam;
			var Thu = (new Date(Thang + "/01/" + Nam)).getDay();
			if (Thu ==0){Thu =7;}
			
			
			
			for (var i=1;i<7;i++)
			{
				for (var j=1;j<8;j++)
				{
					var CN_Table_OThu = (i-1)*7 + j;
					var InNgay = CN_Table_OThu - Thu + 1;
					if (InNgay > 0 && InNgay < SoNgayTrongThang(Thang,Nam) + 1) 
					{
						document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).innerText = InNgay;
						document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu + '_Value').value = InNgay;
						
						if (Ngay == InNgay) 
						{
							document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).classList.remove('PVC_Fns_CN_Ngay_Div_Active');
							document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).classList.add('PVC_Fns_CN_Ngay_Div_Selected');
						}
						else
						{
							document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).classList.add('PVC_Fns_CN_Ngay_Div_Active');
							document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).classList.remove('PVC_Fns_CN_Ngay_Div_Selected');
						}
						var InDenOThu = CN_Table_OThu;
						
					}
					else
					{
						document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).innerText = '';
						document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).classList.remove('PVC_Fns_CN_Ngay_Div_Active');
						document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu).classList.remove('PVC_Fns_CN_Ngay_Div_Selected');
						
						document.getElementById('PVC_Fns_CN_Table_OThu'+ CN_Table_OThu + '_Value').value = 0;
					}
				}
			}
			
			
			if (InDenOThu < 29)
			{
				document.getElementById('PVC_Fns_CN_Table_Hang5').style.display = 'none';
				document.getElementById('PVC_Fns_CN_Table_Hang6').style.display = 'none';
			}
			else if (CN_Table_OThu < 36) 
			{
				document.getElementById('PVC_Fns_CN_Table_Hang5').style.display = 'table-row';
				document.getElementById('PVC_Fns_CN_Table_Hang6').style.display = 'none';
			}
			else
			{
				document.getElementById('PVC_Fns_CN_Table_Hang5').style.display = 'table-row';
				document.getElementById('PVC_Fns_CN_Table_Hang6').style.display = 'table-row';
			}
			document.getElementById('PVC_Fns_CN_Div_Container').style.display = 'block';
			document.getElementById('PVC_Fns_CN_Div_CheContainer').style.display = 'block';
		}
		
		

		function PVC_Fns_CN(InputId,Format,Caption)
		{
			PVC_Fns_CN_IdTextBoxHienTai = InputId;
			PVC_Fns_CN_FormatHienTai = Format;
			//dd/mm, dd/mm/yyyy, mm/yyyy
			var NTNHienTai = document.getElementById(InputId).value;
			document.getElementById('PVC_Fns_CN_GiaTriHienTai').value = NTNHienTai;
			var Ngay = (new Date()).getDate();
			var Thang = (new Date()).getMonth()+1;
			var Nam = (new Date()).getFullYear();
				
			if (NTNHienTai =='')
			{
			}
			else
			{
				Tach = NTNHienTai.split('/');
				if (Tach.length == 1)
				{
					if (isNaN(Tach[0]))
					{
					}
					else if (Tach[0].length ==4)
					{
						Nam = parseInt(Tach[0]);
					}
				}
				else if (Tach.length == 2)
				{
					
					if (isNaN(Tach[0]) || isNaN(Tach[1]))
					{
					}
					else 
					{
						if (Tach[1].length ==4)
						{
							Thang = parseInt(Tach[0]);
							Nam = parseInt(Tach[1]);
						}
						else
						{
							Ngay = parseInt(Tach[0]);
							Thang = parseInt(Tach[1]);
						}
					}
				}
				else if (Tach.length == 3 && Tach[2].length ==4)
				{
					if (isNaN(Tach[0]) || isNaN(Tach[1]) || isNaN(Tach[2]))
					{
					}
					else 
					{
						Ngay = parseInt(Tach[0]);
						Thang = parseInt(Tach[1]);
						Nam = parseInt(Tach[2]);
					}
				}
			}
			if (Caption == "") {Caption = "Chọn ngày";}
			document.getElementById('PVC_Fns_CN_Caption').innerText = Caption;
			
			PVC_Fns_LoadLichThang(Ngay,Thang,Nam);
			document.getElementById('PVC_Fns_CN_Div_Container').style.display = 'block';
			document.getElementById('PVC_Fns_CN_Div_CheContainer').style.display = 'block';
			document.getElementById('PVC_Fns_CN_GiaTriHienTai').focus();
		}
		
		
		
		function PVC_Fns_CN_CN(Ngay)
		{
			var Id = PVC_Fns_CN_IdTextBoxHienTai;
			var FM = PVC_Fns_CN_FormatHienTai;
			//dd/mm, dd/mm/yyyy, mm/yyyy
			var Thang = document.getElementById('PVC_Fns_CN_ThangHienTai').value;
			var Nam = document.getElementById('PVC_Fns_CN_NamHienTai').value;
			
			if (parseInt(Ngay) < 10) {Ngay = "0" + parseInt(Ngay);}
			if (parseInt(Thang) < 10) {Thang = "0" + parseInt(Thang);}
			if (FM == "dd")
			{
				var Kq = Ngay;
			}
			else if (FM == "mm")
			{
				var Kq = Thang;
			}
			else if (FM == "dd/mm")
			{
				var Kq = Ngay + "/" + Thang;
			}
			else if (FM == "mm/yyyy")
			{
				var Kq = Thang + "/" + Nam;
			}
			else 
			{
				var Kq = Ngay + "/" + Thang + "/" + Nam;
			}
			
			if (FM == "mm/yyyy" || Ngay!=="00")
			{
				var e = document.getElementById(Id);
				e.value = Kq;
				e.dispatchEvent(new Event('change'));

    			PVC_Fns_HideLichThang();
			}
			

		}
		
		
		function PVC_Fns_CN_ChuyenThangTruoc()
		{
			var Ngay = parseInt(document.getElementById('PVC_Fns_CN_NgayHienTai').value);
			var Thang = parseInt(document.getElementById('PVC_Fns_CN_ThangHienTai').value);
			var Nam = parseInt(document.getElementById('PVC_Fns_CN_NamHienTai').value);
			if (Thang ==1)
			{
				Thang = 12;
				Nam--;
			}
			else{Thang--;}
			PVC_Fns_LoadLichThang(Ngay,Thang,Nam);
		}
		
		function PVC_Fns_CN_ChuyenThangSau()
		{
			var Ngay = parseInt(document.getElementById('PVC_Fns_CN_NgayHienTai').value);
			var Thang = parseInt(document.getElementById('PVC_Fns_CN_ThangHienTai').value);
			var Nam = parseInt(document.getElementById('PVC_Fns_CN_NamHienTai').value);
			if (Thang == 12)
			{
				Thang = 1;
				Nam++;
			}
			else{Thang++;}
			PVC_Fns_LoadLichThang(Ngay,Thang,Nam);
		}
	

        //<input type="text" id="Test" placeholder="click to pick" onclick="PVC_Fns_CN(this.id,'dd/mm','Chọn..đến ngày..');"> 
