import { PayTech, PayTechConfig, PayTechPaymentParams } from "../paytech";

global.fetch = jest.fn();

describe("PayTech SDK", () => {
    const mockConfig: PayTechConfig = {
        apiKey: "test-api-key",
        apiSecret: "test-api-secret",
    };

    const paytech = new PayTech(mockConfig);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("devrait être instancié avec les bonnes valeurs", () => {
        expect(paytech).toBeInstanceOf(PayTech);
        expect(paytech).toHaveProperty("apiKey", "test-api-key");
        expect(paytech).toHaveProperty("apiSecret", "test-api-secret");
    });

    it("devrait créer un paiement avec les bons paramètres", async () => {
        const paymentData: PayTechPaymentParams = {
            item_name: "Produit Test",
            item_price: "50000",
            ref_command: "CMD12345",
            ipn_url: "https://example.com/ipn",
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
            env: "test"
        };

        const mockResponse = {
            success: true,
            redirect_url: "https://paytech.sn/payment/redirect",
        };

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        } as any);

        const response = await paytech.createPayment(paymentData);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "https://paytech.sn/api/payment/request-payment",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    "Content-Type": "application/json",
                    API_KEY: "test-api-key",
                    API_SECRET: "test-api-secret",
                }),
                body: expect.any(String),
            })
        );

        expect(response).toEqual(mockResponse);
    });

    it("devrait gérer une erreur API", async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(new Error("Erreur API"));

        const paymentData: PayTechPaymentParams = {
            item_name: "Produit Test",
            item_price: "50000",
            ref_command: "CMD12345",
            ipn_url: "https://example.com/ipn",
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
            env: "test"
        };

        await expect(paytech.createPayment(paymentData)).rejects.toThrow("Erreur API");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});