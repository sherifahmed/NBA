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
    
    // Detailed Address Info
    address1: a.string(),
    address2: a.string(),
    country: a.string(),
    
    // Business Context
    homeCompany: a.string(), // e.g. "Suhana's Home Boarding"
    
    // Legal & App Status
    idDocument: a.string(), // Key for S3
    tcAccepted: a.boolean(),
    isAppUser: a.boolean(),
    
    // Relationships
    pets: a.hasMany('Pet', 'clientId'),
    bookings: a.hasMany('Booking', 'clientId'),
  }).authorization(allow => [allow.publicApiKey()]),

  // Pet details per client
  Pet: a.model({
    name: a.string().required(),
    breed: a.string(),
    size: a.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    petType: a.string(), // e.g. "Dog"
    gender: a.string(), // MALE/FEMALE
    birthday: a.date(),
    behaviour: a.string(),
    
    // Health & Diet
    dietaryPreference: a.string(),
    allergies: a.string(),
    neuteredStatus: a.boolean(),
    lastHeatMonth: a.string(),
    lastHeatYear: a.string(),
    
    // Vaccinations & Prevention
    vaxStatus: a.string(),
    vaccinations: a.string(), // Detailed list or JSON string
    vaxExpiryDate: a.date(), // Legacy support if needed
    
    tickPrevention: a.boolean(),
    tickPrevDate: a.date(),
    tickPrevMethod: a.string(),
    dewormingDueDate: a.date(),
    
    // Record Proofs
    vaxProof1: a.string(), // Keys for S3 or photo URLs
    vaxProof2: a.string(),
    vaxProof3: a.string(),
    vaxProof4: a.string(),
    petPhoto: a.string(),
    
    // Medical Contacts
    medication: a.boolean(),
    medicationDetail: a.string(),
    majorIllnessHistory: a.string(),
    vetName: a.string(),
    vetContact: a.string(),
    guardianName: a.string(),
    guardianContact: a.string(),
    
    // Operational
    status: a.string(), // ACTIVE/ARCHIVED/etc.
    ageMonths: a.integer(), // Calculated or static record
    dietaryNotes: a.string(), // Legacy notes field

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
