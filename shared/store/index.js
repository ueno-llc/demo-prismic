import Network from './Network';
import Prismic from './Prismic';

export default class Store {

  constructor(state = {}) {
    this.network = new Network(state);
    this.prismic = new Prismic(state, this.network);
  }
}
