const triggerOpen = document.querySelectorAll('[trigger-button]');
const triggerClose = document.querySelectorAll('[close-button]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < triggerOpen.length; i++) {
    let currentId = triggerOpen[i].dataset.target,
    targetEl = document.querySelector(`#${currentId}`)
    
    const openData = function() {
        targetEl.classList.remove('active');
        overlay.classList.remove('active');
    }

    triggerOpen[i].addEventListener('click', function(){
        targetEl.classList.add('active');
        overlay.classList.add('active');
    });

    targetEl.querySelector('[close-button]').addEventListener('click', openData);
    overlay.addEventListener('click', openData);
}


//mobile-menu submenu

const submenu = document.querySelectorAll('.child-trigger');
submenu.forEach ((menu) => menu.addEventListener('click', function(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('active') : null);
    if (this.closest('.has-child').classList != 'active') {
        this.closest('.has-child').classList.toggle('active');
    }   
}));

// sorter

const sorter = document.querySelector('.sort-list');
if (sorter) {
    const sortLi = sorter.querySelectorAll('li'); // ค้นหาทุก <li> ภายใน .sort-list
    const optTrigger = sorter.querySelector('.opt-trigger'); // ค้นหาปุ่มที่ใช้เปิดเมนู
    const ul = sorter.querySelector('ul'); // ค้นหาชื่อของ <ul> ที่เก็บรายการ

    if (optTrigger) {
        optTrigger.addEventListener('click', function(event) {
            // ป้องกันไม่ให้เกิดการกระทำเริ่มต้น
            event.preventDefault(); // ไม่ให้เกิดการกระทำเริ่มต้น เช่น การ reload หรือ action อื่นๆ
            ul.classList.toggle('show'); // เปลี่ยนการแสดงผลของ <ul> ให้แสดงหรือไม่แสดง
        });
    }

    // Loop through each list item
    sortLi.forEach((item) => {
        item.addEventListener('click', function(event) {
            // ป้องกันไม่ให้เกิดการกระทำเริ่มต้น
            event.preventDefault(); // ป้องกันการกระทำเริ่มต้น เช่น การไปที่ลิงค์

            // ลบคลาส active จากรายการอื่น ๆ
            sortLi.forEach((li) => li !== this ? li.classList.remove('active') : null); // ลบคลาส active จาก <li> อื่น ๆ

            // เพิ่มคลาส active ให้กับรายการที่ถูกคลิก
            this.classList.add('active'); // เพิ่มคลาส active ให้กับ <li> ที่คลิก

            // อัพเดตข้อความที่เลือกใน span
            const valueSpan = sorter.querySelector('.opt-trigger span.value');
            if (valueSpan) {
                valueSpan.textContent = this.textContent; // อัพเดตข้อความใน <span> ด้วยข้อความที่เลือกจาก <li>
            }

            // Toggle การแสดงผลของ dropdown (หลังจากคลิกที่รายการ)
            ul.classList.toggle('show'); // ปิดหรือเปิดการแสดงผลของเมนู
        });
    });
}

// tabbed
const trigger = document.querySelectorAll('.tabbed-trigger'); // คำที่ถูกต้อง
const content = document.querySelectorAll('.tabbed > div');

trigger.forEach((btn) => {
    btn.addEventListener('click', function() {
        let dataTarget = this.dataset.id; // หาค่าจาก data-id ของปุ่มที่คลิก
        let body = document.querySelector(`#${dataTarget}`); // หาเนื้อหาที่ตรงกับ id ที่มีค่าเดียวกับ data-id

        // ลบคลาส active ออกจากทุกปุ่มและเนื้อหาทั้งหมด
        trigger.forEach((b) => b.parentNode.classList.remove('active'));
        content.forEach((c) => c.classList.remove('active'));

        // เพิ่มคลาส active ให้กับปุ่มที่คลิกและเนื้อหาที่เกี่ยวข้อง
        this.parentNode.classList.add('active'); // เพิ่มคลาส active ให้กับพาเรนท์ของปุ่มที่คลิก
        body.classList.add('active'); // เพิ่มคลาส active ให้กับเนื้อหาที่เลือก
    });
});


//slider

const swiper = new Swiper('.sliderbox', {
    
    loop: true,
    effect: 'fade',
    autoHeight: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

  });









// carousel

const carousel = new Swiper('.carouselbox', {
    spaceBetween: 30,
    slidesPerView: 'auto',
    centeredSlides: true,
  
    // If we need pagination
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        481: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            centeredSlides: false,
        },
        640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            centeredSlides: false,
        },
        992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            centeredSlides: false,
        }        
    }
});

// product image > page-single

const thumbImage = new Swiper('.thumbnail-image', {
    // loop: true,  // ถ้าเปิดใช้งาน loop จะทำให้ภาพวนรอบจากสุดท้ายไปยังภาพแรกโดยอัตโนมัติ
    direction: 'vertical', // กำหนดทิศทางของการเลื่อนเป็นแนวตั้ง
    spaceBetween: 15, // กำหนดระยะห่างระหว่างแต่ละสไลด์เป็น 15px
    slidesPerView: 1, // กำหนดให้แสดงแค่ 1 ภาพในแต่ละช่วงเวลา
    freeMode: true, // เปิดใช้งาน freeMode เพื่อให้สามารถเลื่อนภาพแบบอิสระ
    watchSlideProgress: true, // ติดตามความคืบหน้าของการเลื่อนสไลด์ (ใช้ในการเชื่อมโยงสไลด์อื่นๆ)
});

const mainImage = new Swiper('.main-image', {
    loop: true, // เปิดใช้งานการวนลูปของภาพหลักจากสุดท้ายกลับไปที่ภาพแรก
    autoHeight: true, // ปรับความสูงของภาพให้เหมาะสมกับความสูงของภาพที่แสดง
    pagination: {
        el: '.swiper-pagination', // กำหนดตำแหน่งของการแสดง pagination
        clickable: true, // ทำให้สามารถคลิกที่ปุ่ม pagination เพื่อเปลี่ยนภาพได้
    },
    thumbs: {
        swiper: thumbImage, // เชื่อมโยงการทำงานของภาพย่อย (thumbnail images) กับภาพหลัก
    },
});