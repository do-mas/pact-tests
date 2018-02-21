import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {ProductsService} from './user.service';
import {Matchers, PactWeb} from '@pact-foundation/pact-web';

describe('ProductsService', () => {

  let provider;

  beforeAll(function (done) {
    provider = new PactWeb({
      consumer: 'ui',
      provider: 'product_provider',
      port: 1234,
      host: '127.0.0.1',
    });

    // required for slower CI environments
    setTimeout(done, 2000);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  afterAll(function (done) {
    provider.finalize()
    .then(function () {
      done();
    }, function (err) {
      done.fail(err);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ProductsService
      ],
    });
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('create()', () => {

    const expectedProduct = {
      productId: 1,
      productName: 'a product name'
    };

    beforeAll((done) => {
      provider.addInteraction({
        state: `provider accepts a new product`,
        uponReceiving: 'a request to save product',
        withRequest: {
          method: 'POST',
          path: '/api/products',
          body: expectedProduct,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          body: {
              productId: Matchers.integer(),
              productName: Matchers.like('text')
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, error => done.fail(error));
    });

    it('should create a Person', (done) => {
      const userService: ProductsService = TestBed.get(ProductsService);
      userService.create().subscribe(response => {
        expect(response.productId).toBeDefined();
        done();
      }, error => {
        done.fail(error);
      });
    });
  });

  describe('getList()', () => {

    beforeAll((done) => {
      provider.addInteraction({
        state: `provider has products to provide`,
        uponReceiving: 'a request to list products',
        withRequest: {
          method: 'GET',
          path: '/api/products',
          headers: {
          }
        },
        willRespondWith: {
          status: 200,
          body: Matchers.eachLike({ productId: 1, productName: 'a product name'})},
          headers: {
            'Content-Type': 'application/json'
          }
      }).then(done, error => done.fail(error));
    });

    it('should return a list of products', (done) => {
      const userService: ProductsService = TestBed.get(ProductsService);
      userService.getList().subscribe(response => {
        expect(response).toBeDefined();
        expect(response[0].productId).toBeDefined();
        done();
      }, error => {
        done.fail(error);
      });
    });
  });


});
