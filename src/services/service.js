export default class GotService{
    constructor(){
      this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
      
      if(!res.ok){
          throw new Error(`Could not fetch ${url} , ${res.status}`);
      }
      return await res.json();
  };

  async getAllCharacters(){
      const res = await this.getResource('/characters?page=5&pageSize=10');
      return res.map(this._transformCharacter)
      
  }

  async getCharacter(id){
      const character= await this.getResource(`/characters/${id}`);
      return this._transformCharacter(character);
  }

    async getAllBooks(){
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);

        }

    async getBook(id){
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
        }

    async getAllHouses(){
        const res = await this.getResource('/houses/');
        return res.map(this._transformHouse);

        }

    async getHouse(id){
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
        }

        _transformCharacter(char){

        function emptyPlace(item){
            return item === ''? 'no information': item
            }
            return{
                name: emptyPlace(char.name),
                gender: emptyPlace(char.gender),
                born: emptyPlace(char.born),
                died: emptyPlace(char.died),
                culture:emptyPlace(char.culture) 
            }
        }

        _transformHouse(house){
            function emptyPlace(item){
                return item === ''? 'no information': item
                }
                return{
                name: emptyPlace( house.name),
                region: emptyPlace( house.region),
                words: emptyPlace( house.words),
                titles: emptyPlace( house.titles),
                overlord: emptyPlace( house.overlord),
                ancestralWeapons: emptyPlace( house.ancestralWeapons)
            }
        }

        _transformBook(book){
            function emptyPlace(item){
                return item === ''? 'no information': item
                }
                return{
                name:emptyPlace( book.name),
                numberOfPages:emptyPlace( book.numberOfPages),
                publiser:emptyPlace( book.publiser),
                released:emptyPlace( book.released)
            }
        }

        

}
