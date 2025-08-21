# Frontend Haftası

Bu proje
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
ile başlatılmış bir [Next.js](https://nextjs.org) uygulamasıdır.

## Başlangıç

Projeyi çalıştırabilmek için **backend** kısmına da sahip olmalısınız.

### 1. Backend'i Çalıştırın

Önce backend projesinin dizinine gidin:

``` bash
cd backend
```

Ardından backend servisini ayağa kaldırmak için:

``` bash
docker compose up --build
```

> Eğer daha önce build aldıysanız sadece `docker compose up` da yeterli
> olacaktır.

### 2. Frontend'i Başlatın

Ardından frontend kısmını çalıştırmak için:

``` bash
npm install
npm run dev
```

### 3. Uygulamaya Erişim

Tüm servisler çalıştıktan sonra tarayıcınızda aşağıdaki adrese gidin:\
👉 <http://localhost:3000>

------------------------------------------------------------------------

## Job'ların Çalıştırılması ve Sonuçların Görüntülenmesi

-   **Shell Alanı** → Yazdığınız komutu çalıştırır.\
-   **Crawl Alanı** → Verdiğiniz URL'i detaylıca tarar.\
-   **HTTP Status Job'u** → Verilen URL'in HTTP durum kodunu (örneğin
    `200`, `404`, `500` vb.) kontrol edip sonuçlara yazar.

Çalıştırdığınız job'lar **ana sayfada değil**, **Jobs Results
(History)** ekranında görünür.\
- Jobs Results sayfasına girdiğinizde çalıştırdığınız job hemen
listelenmeyebilir.\
- **Sayfayı yenileyip birkaç saniye bekleyin** → job geçmişin en üstüne
düşecektir.\
- İlgili job'a tıklayarak detaylarını görebilirsiniz.
