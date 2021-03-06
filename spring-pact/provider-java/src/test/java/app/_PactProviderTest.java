package app;

import au.com.dius.pact.provider.junit.PactRunner;
import au.com.dius.pact.provider.junit.Provider;
import au.com.dius.pact.provider.junit.State;
import au.com.dius.pact.provider.junit.loader.PactFolder;
import au.com.dius.pact.provider.junit.target.HttpTarget;
import au.com.dius.pact.provider.junit.target.Target;
import au.com.dius.pact.provider.junit.target.TestTarget;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.boot.SpringApplication;

@RunWith(PactRunner.class)
@Provider("product_provider")
@PactFolder("pacts")
public class _PactProviderTest {

    @TestTarget
    public final Target target = new HttpTarget("http", "localhost", 8080, "");

    @BeforeClass
    public static void start() {
        SpringApplication.run(Application.class);
    }

    @State("get product by id")
    public void getProductById() {
    }
    @State("create product")
    public void createProduct() {
    }
    @State("get products list")
    public void getListForBackend() {
    }
    @State("provider accepts a new product")
    public void getProductList() {
    }
    @State("provider has products to provide")
    public void getProductListUI() {
    }

}