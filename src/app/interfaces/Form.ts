export interface initialStateI {
    PostBilling: {
        status:  "idle" | "loading" | "succeeded" | "failed";
        error: undefined | string;
        response: {
            message: string;
            data: null | BillingResponse;
        }
    };
}


export interface BillingInfoI {
        name: string;
        email: string;
        phone: number | null;
        Address: AddressI;
}

export interface AddressI {
    street: string;
    city: string;
    state: string;
    zip: number | null;
    suburb: string;
}

interface BillingResponse {
    message: string;
    data: {
      name: string;
      mail: string;
      telefono: number;
      _id: string;
      __v: number;
    };
  }