import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1: Create our schema ===========================================
    Detailed schema for Neelus Boarding app based on Master PRD.
========================================================================*/

const schema = a.schema({
  // Global customizable settings for pricing tiers and rules
  BusinessSettings: a.model({
    id: a.id().required(),
    puppyDailyRate: a.float(),
    smallBreedDailyRate: a.float(),
    mediumBreedDailyRate: a.float(),
    largeBreedDailyRate: a.float(),
    daycareRate: a.float(),
    gracePeriodHours: a.integer(),
    latePickupTier1Rate: a.float(), // e.g. Daycare charge for < 8 hrs
    advancePaymentAmount: a.float(),
  }).authorization(allow => [allow.publicApiKey()]), // Replace with auth later

  // Client profiles mapped to Pets and Bookings
  Client: a.model({
    name: a.string().required(),
    phone: a.string().required(),
    email: a.string(),
    onboardingStatus: a.enum(['PENDING', 'COMPLETED']),
    whatsappWaMeLink: a.string(),
    
    // Relationships
    pets: a.hasMany('Pet', 'clientId'),
    bookings: a.hasMany('Booking', 'clientId'),
  }).authorization(allow => [allow.publicApiKey()]),

  // Pet details per client
  Pet: a.model({
    name: a.string().required(),
    breed: a.string(),
    size: a.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    ageMonths: a.integer(),
    vaccinationExpiryDate: a.date(),
    dewormingDueDate: a.date(),
    dietaryNotes: a.string(),

    // Relationships
    clientId: a.id(),
    client: a.belongsTo('Client', 'clientId'),
    bookings: a.hasMany('Booking', 'petId'),
  }).authorization(allow => [allow.publicApiKey()]),

  // Bookings encompassing all stays
  Booking: a.model({
    checkInExpected: a.datetime().required(),
    checkOutExpected: a.datetime().required(),
    actualCheckIn: a.datetime(),
    actualCheckOut: a.datetime(),
    status: a.enum(['UPCOMING', 'ACTIVE', 'PAST', 'NO_SHOW']),
    advancePaid: a.float(),
    totalAmountCalculated: a.float(),
    requiresDaycareCharge: a.boolean(), // Calculated late buffer
    invoiceLink: a.string(),

    // Relationships
    clientId: a.id(),
    client: a.belongsTo('Client', 'clientId'),
    petId: a.id(),
    pet: a.belongsTo('Pet', 'petId'),
  }).authorization(allow => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
