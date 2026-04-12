import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1: Create our schema ===========================================
    Detailed schema for Neelus Boarding app based on Master PRD.
========================================================================*/

const schema = a.schema({
  // Represents a Pet Boarding Business (Company)
  BusinessProfile: a.model({
    id: a.id().required(),
    name: a.string().required(),
    ownerEmail: a.string().required(),
    address: a.string(),
    currency: a.string(), // e.g. "INR", "USD"
    logoUrl: a.string(),
    
    // Pricing Config (formerly BusinessSettings)
    puppyDailyRate: a.float(),
    smallBreedDailyRate: a.float(),
    mediumBreedDailyRate: a.float(),
    largeBreedDailyRate: a.float(),
    daycareRate: a.float(),
    gracePeriodHours: a.integer(),
    lateFeeSlabs: a.string(), // JSON string representing fee tiers
    advancePaymentAmount: a.float(),

    // Relationships
    clients: a.hasMany('Client', 'businessId'),
    invitations: a.hasMany('BusinessInvitation', 'businessId'), // If business sends invites to sub-admins
  }).authorization(allow => [
    allow.publicApiKey(), // Temporarily for dev
    allow.owner(), // Only the business owner can manage their profile
    allow.group('Admins') // Super admins can view/manage
  ]),

  // Invitation for a NEW Company to join the platform
  BusinessInvitation: a.model({
    code: a.string().required(),
    businessEmail: a.string().required(),
    businessName: a.string(),
    status: a.enum(['PENDING', 'ACCEPTED', 'EXPIRED']),
    expiresAt: a.datetime().required(),
    invitedBy: a.string(), // Super admin email
    
    // Optional link to businessId once accepted
    businessId: a.id(),
  }).authorization(allow => [
    allow.publicApiKey(),
    allow.group('Admins')
  ]),

  // Consumer (Pet Parent) profiles mapped to a specific Business
  Client: a.model({
    name: a.string().required(),
    phone: a.string().required(),
    email: a.string(),
    onboardingStatus: a.enum(['PENDING', 'COMPLETED']),
    whatsappWaMeLink: a.string(),
    
    // Detailed Address Info
    address1: a.string(),
    address2: a.string(),
    city: a.string(),
    state: a.string(),
    country: a.string(),
    pincode: a.string(),
    
    // Business Context
    businessId: a.id(), // Links to BusinessProfile
    business: a.belongsTo('BusinessProfile', 'businessId'),
    
    // Legal & App Status
    idDocument: a.string(),
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
    petType: a.string(),
    gender: a.string(),
    birthday: a.date(),
    behaviour: a.string(),
    weight: a.float(),
    
    // Health & Diet
    dietaryPreference: a.string(),
    allergies: a.string(),
    neuteredStatus: a.boolean(),
    lastHeatMonth: a.string(),
    lastHeatYear: a.string(),
    
    // Vaccinations & Prevention
    vaxStatus: a.string(),
    vaccinations: a.string(),
    tickPrevention: a.boolean(),
    tickPrevDate: a.date(),
    tickPrevMethod: a.string(),
    dewormingDueDate: a.date(),
    
    // Record Proofs
    vaxProof1: a.string(),
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
    status: a.string(), // ACTIVE/ARCHIVED
    ageMonths: a.integer(),

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
    requiresDaycareCharge: a.boolean(),
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
