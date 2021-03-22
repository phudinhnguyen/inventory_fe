export class ProductModel {
    _id: string
    ah_co_thai_cho_con_bu: string
    ah_lai_xe: string
    bao_quan: string
    chong_chi_dinh: string
    duoc_ly: string
    han_dung: string
    qua_lieu: string
    tac_dung_khong_mong_muon: string
    than_trong: string
    thanh_phan: string
    tuong_tac_thuoc: string
    phan_loai: string
    cong_dung_chi_dinh: string
    id: string
    sku_id: string
    imageUrls: Array<string>
    khoi_luong_the_tich: string
    lieu_luong_cach_dung: string
    loai: string
    mo_ta: string
    name: string
    nha_cung_cap: Array<any>
    nha_san_xuat: string
    nhom_san_pham: any
    phan_loai_san_pham: string
    phan_loais: Array<any>
    quy_cach_dong_goi: Array<any>

    constructor(product?: any) {
        this._id = product?._id || ''
        this.ah_co_thai_cho_con_bu = product?.ah_co_thai_cho_con_bu || ''
        this.ah_lai_xe = product?.ah_lai_xe || ''
        this.bao_quan = product?.bao_quan || ''
        this.chong_chi_dinh = product?.chong_chi_dinh || ''
        this.duoc_ly = product?.duoc_ly || ''
        this.han_dung = product?.han_dung || ''
        this.qua_lieu = product?.qua_lieu || ''
        this.tac_dung_khong_mong_muon = product?.tac_dung_khong_mong_muon || ''
        this.than_trong = product?.than_trong || ''
        this.thanh_phan = product?.thanh_phan || ''
        this.tuong_tac_thuoc = product?.tuong_tac_thuoc || ''
        this.phan_loai = product?.phan_loai || ''
        this.nhom_san_pham = product?.nhom_san_pham || ''
        this.cong_dung_chi_dinh = product?.cong_dung_chi_dinh || ''
        this.lieu_luong_cach_dung = product?.lieu_luong_cach_dung || ''
        this.id = product?.id || ''
        this.sku_id = product?.sku_id || ''
        this.imageUrls = product?.imageUrls || []
        this.khoi_luong_the_tich = product?.khoi_luong_the_tich || ''
        this.loai = product?.loai || ''
        this.mo_ta = product?.mo_ta || ''
        this.name = product?.name || ''
        this.nha_cung_cap = product?.nha_cung_cap || ''
        this.nha_san_xuat = product?.nha_san_xuat || ''
        this.phan_loai_san_pham = product?.phan_loai_san_pham || ''
        this.phan_loais = product?.phan_loais || ''
        this.quy_cach_dong_goi = product?.quy_cach_dong_goi || ''
    }
}