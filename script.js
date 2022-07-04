const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');

//seçili olan koltuklar hariç tüm koltukları seats değişkenine aldık
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();


container.addEventListener('click',function (e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change',function (e){
   calculateTotal();
});

function calculateTotal(){
    //seçtiğimiz koltukları selectedSeats değişkenie aldık.
    let selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatsArr = [];
    const seatsArr = [];


    //seçilen koltukları dizi içerisine aldık
    selectedSeats.forEach(function (seat){
         selectedSeatsArr.push(seat);
    })

    //önceden seçili olan koltular hariç tüm koltuklarıda dizi içerisine alıyoruz.
    seats.forEach(function (seat){
        seatsArr.push(seat);
    });


    //burada seçili olan koltuğun indexini tüm koltukların kayıt olduğu seatsArr dizisi içerisinde ararız
    let selectedSeatIndexs = selectedSeatsArr.map(function (seat){
        return seatsArr.indexOf(seat);
    })

    let selectedSeatCount = selectedSeats.length;
    amount.innerText = selectedSeatCount * select.value;
    count.innerText = selectedSeatCount;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));


  if(selectedSeats != null && selectedSeats.length > 0){
      seats.forEach(function (seat,index){
         if(selectedSeats.indexOf(index) > -1 ){
             seat.classList.add('selected');
         }
      });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex != null){
      select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}


