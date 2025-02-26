export interface PayTechPaymentParams {
    item_name: string;
    item_price: string;
    ref_command: string;
    currency?: string;
    command_name?: string;
    env?: "test" | "prod";
    ipn_url: string;
    success_url: string;
    cancel_url: string;
    custom_field?: Record<string, any>;
}

export interface PayTechConfig {
    apiKey: string;
    apiSecret: string;
}

export class PayTech {
    private apiKey: string;
    private apiSecret: string;
    private apiUrl: string;

    constructor(config: PayTechConfig) {
        this.apiKey = config.apiKey;
        this.apiSecret = config.apiSecret;
        this.apiUrl = "https://paytech.sn/api/payment/request-payment";
    }

    async createPayment(params: PayTechPaymentParams) {
        const body = {
            ...params,
            currency: params.currency || "XOF",
            env: params.env || "test",
            command_name: params.command_name || `Paiement ${params.item_name}`,
            custom_field: JSON.stringify(params.custom_field || {}),
        };

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            API_KEY: this.apiKey,
            API_SECRET: this.apiSecret,
        };

        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        return response.json();
    }
}
