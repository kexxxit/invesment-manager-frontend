// Interface for bond event
export interface IBondEvent {
  // Unique identifier of the event
  id: string;
  // Identifier of the bond instrument
  instrumentId: string;
  // Date of the event
  eventDate: string;
  // Type of the event
  eventType: EventType;
  // Amount of the payment per one bond
  payOneBond: number;
  // Coupon start date
  couponStartDate: string;
  // Coupon end date
  couponEndDate: string;
  // Coupon period in days
  couponPeriod: number;
  // Coupon interest rate
  couponInterestRate: number;
}

// Enum for bond event types
export enum EventType {
    // Undefined value
    Unspecified = 0,
    // Coupon
    Cpn = 1,
    // Option (offer)
    Call = 2,
    // Maturity (redemption)
    Mty = 3,
    // Conversion
    Conv = 4
  }
  
