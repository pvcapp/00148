APP.features.chuNha.dashboard = APP.features.chuNha.dashboard || {};
APP.features.chuNha.dashboard.list = APP.features.chuNha.dashboard.list || {};
APP.features.chuNha.dashboard.list.control =
{
    init: function()
    {
        //this.syncFromServer(APP.cache.tongQuan);
        APP.features.chuNha.dashboard.list.ui.init();
    },
    rerender: function()
    {
        APP.features.chuNha.dashboard.list.control.capNhatDataTuClientCache();
        APP.features.chuNha.dashboard.list.ui.render();
        if (APP.state.manHinhHienTai == {vaiTro: 'chuNha', module: 'dashboard', type: 'list'})
        {
            APP.features.chuNha.dashboard.list.ui.show();
        }
    },
    syncFromServer: function(tongQuan)
    {
        const rows = Array.isArray(tongQuan)
            ? tongQuan
            : (tongQuan && Array.isArray(tongQuan.data) ? tongQuan.data : []);
        const valuesByKey = {};

        rows.forEach(function(item)
        {
            if (Array.isArray(item) && item.length > 2)
            {
                valuesByKey[item[1]] = item[2];
            }
            else if (item && item.tenBien)
            {
                valuesByKey[item.tenBien] = item.value;
            }
        });

        if (tongQuan && !Array.isArray(tongQuan) && !Array.isArray(tongQuan.data))
        {
            Object.keys(tongQuan).forEach(function(key)
            {
                if (Object.prototype.hasOwnProperty.call(valuesByKey, key)) return;
                const item = tongQuan[key];
                valuesByKey[key] = item && typeof item === 'object' ? item.value : item;
            });
        }

        APP.features.chuNha.dashboard.data.slice(1).forEach(function(row)
        {
            if (Object.prototype.hasOwnProperty.call(valuesByKey, row[1]) && valuesByKey[row[1]] != null)
            {
                row[2] = valuesByKey[row[1]];
            }
        });
    },
    update: function(chiTieu, bienDong)
    {
        const changes = typeof chiTieu === 'object' && chiTieu !== null
            ? chiTieu
            : {[chiTieu]: bienDong};
        const updatedRows = [];

        Object.keys(changes).forEach(function(key)
        {
            const row = APP.features.chuNha.dashboard.data.find(function(item)
            {
                return item[1] === key;
            });
            if (!row) return;

            const currentValue = Number(row[2]) || 0;
            const nextValue = Math.max(0, currentValue + (Number(changes[key]) || 0));
            if (nextValue === currentValue) return;

            row[2] = nextValue;
            updatedRows.push({tenBien: row[1], value: nextValue});
        });

        if (!updatedRows.length) return;
        APP.features.chuNha.dashboard.list.ui.render();
        APP.features.chuNha.dashboard.list.api.update(updatedRows).catch(function(loi)
        {
            console.error('Không thể đồng bộ số liệu dashboard lên sheet:', loi);
        });
    },
    updateRoomCounts: function(phongCu, phongMoi)
    {
        const getRoomMetric = function(phong)
        {
            if (!phong) return '';
            const status = String(phong.trangThai || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            if (status.includes('thue')) return 'soPhongDangThue';
            if (status.includes('trong')) return 'soPhongTrong';
            return '';
        };
        const changes = {};
        const metricCu = getRoomMetric(phongCu);
        const metricMoi = getRoomMetric(phongMoi);

        if (!phongCu && phongMoi)
        {
            changes.tongSoPhong = 1;
        }
        else if (phongCu && !phongMoi)
        {
            changes.tongSoPhong = -1;
        }

        if (metricCu !== metricMoi)
        {
            if (metricCu) changes[metricCu] = (changes[metricCu] || 0) - 1;
            if (metricMoi) changes[metricMoi] = (changes[metricMoi] || 0) + 1;
        }

        this.update(changes);
    },
    updateCustomerCount: function(khachCu, khachMoi)
    {
        const isActive = function(khach)
        {
            return Boolean(khach) && String(khach.active) !== '0';
        };
        const activeCu = isActive(khachCu);
        const activeMoi = isActive(khachMoi);
        if (activeCu !== activeMoi)
        {
            this.update('tongSoKhach', activeMoi ? 1 : -1);
        }
    },
    updateContractRoom: function(phongTruocHopDong, phongSauHopDong)
    {
        this.updateRoomCounts(phongTruocHopDong, phongSauHopDong);
    },
    refreshFromServer: function()
    {
        return APP.features.chuNha.dashboard.list.api.get().then(function(tongQuan)
        {
            APP.cache.tongQuan = tongQuan || [];
            APP.features.chuNha.dashboard.list.control.syncFromServer(APP.cache.tongQuan);
            APP.features.chuNha.dashboard.list.ui.render();
        }).catch(function(loi)
        {
            console.error('Không thể tải số liệu dashboard:', loi);
        });
    },
    capNhatDataTuClientCache: function()
    {
        APP.features.chuNha.dashboard.data.soPhongDangThue.value = 0;
        APP.features.chuNha.dashboard.data.soPhongTrong.value = 0;
        APP.cache.danhSachPhong.data.forEach(phong => function()
        {
            if (APP.features.chuNha.quanLyPhong.control.dangChoThue(phong))
            {
                APP.features.chuNha.dashboard.data.soPhongDangThue.value ++;
            }
            else
            {
                APP.features.chuNha.dashboard.data.soPhongTrong.value ++;
            }
        });
    }
};