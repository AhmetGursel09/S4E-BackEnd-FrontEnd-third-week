# Frontend Haftası Projesi

Bu proje **Next.js tabanlı frontend** ve **Flask tabanlı backend**
içeren tam yığın (full-stack) bir uygulamadır.\
Frontend kısmı ile job (iş) tetikleme ve job sonuçlarını görüntüleme
yapılırken, backend kısmı işlerin kuyruğa alınması, işlenmesi ve
sonuçlarının saklanmasından sorumludur.

------------------------------------------------------------------------

## Başlangıç

Projeyi çalıştırabilmek için aşağıdaki adımları izleyin:

### 1. Backend dizinine gidin

Öncelikle backend projesinin bulunduğu dizine gidin:

``` bash
cd backend-haftasi
```

### 2. Docker Compose ile başlatın

Backend ve frontend servisleri aynı `docker-compose.yml` içinde
tanımlıdır.\
Bu nedenle yalnızca şu komutla tüm servisler ayağa kalkacaktır:

``` bash
docker compose up --build
```

Bu komut:\
- Backend (Flask, Celery, RabbitMQ, PostgreSQL)\
- Frontend (Next.js)\
servislerini aynı anda ayağa kaldırır.

### 3. Uygulamaya erişin

Tüm servisler ayağa kalktıktan sonra aşağıdaki adresten frontend
arayüzüne erişebilirsiniz:

👉 <http://localhost:3000>

------------------------------------------------------------------------

## Özellikler

-   **Shell Alanı** → Girdiğiniz komutu çalıştırır ve sonucu job olarak
    kaydeder.\
-   **Crawl Alanı** → Verdiğiniz URL'i detaylıca tarar ve sonucu job
    history'sine ekler.\
    \> Crawl işlemi hakkında daha fazla bilgi için **videoyu repoda
    bulabilirsiniz.**\
-   **HTTP Status** → Verdiğiniz URL'in HTTP durum kodunu döner.

Çalıştırdığınız tüm işlemler, anında ana ekranda görünmeyebilir.\
**Job Results (Geçmiş)** sayfasına gidip sayfayı yenilediğinizde
işleminiz listenin en üstüne düşer.\
Oradaki job'a tıkladığınızda işin detaylarını görebilirsiniz.

------------------------------------------------------------------------

## Kullanılan Teknolojiler

### Frontend

-   Next.js\
-   React\
-   TypeScript\
-   TailwindCSS\
-   ShadCN UI\
-   React Query

### Backend

-   Flask\
-   Celery\
-   PostgreSQL\
-   SQLAlchemy\
-   RabbitMQ\
-   Python\
-   Docker & Docker Compose\
-   Katana

------------------------------------------------------------------------

## Notlar

-   **Job zaman bilgisi**: Saat kısmı ayarlı değildir. Türkiye/İstanbul
    saat diliminde olan kullanıcılar için job tarihi **3 saat erkene
    kaymaktadır.**
