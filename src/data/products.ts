
import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'festive',
    name: 'Coșuri pentru Sărbători',
    slug: 'cosuri-sarbatori',
    description: 'Coșuri cadou perfecte pentru a sărbători momentele speciale',
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=2000',
    featured: true,
  },
  {
    id: 'christmas',
    name: 'Coșuri de Crăciun',
    slug: 'cosuri-craciun',
    description: 'Coșuri cadou festive pentru sărbătorile de iarnă',
    image: 'https://images.unsplash.com/photo-1576830673147-ba495b85743a?q=80&w=2000',
    parentId: 'festive',
  },
  {
    id: 'easter',
    name: 'Coșuri de Paște',
    slug: 'cosuri-paste',
    description: 'Coșuri cadou pentru sărbătorile pascale',
    image: 'https://images.unsplash.com/photo-1521104795873-bbd6fa3c9a0e?q=80&w=2000',
    parentId: 'festive',
  },
  {
    id: 'valentines',
    name: 'Ziua Îndrăgostiților',
    slug: 'ziua-indragostitilor',
    description: 'Cadouri romantice pentru persoana iubită',
    image: 'https://images.unsplash.com/photo-1549046675-dd779b6f5025?q=80&w=2000',
    parentId: 'festive',
  },
  {
    id: 'gourmet',
    name: 'Coșuri Gourmet',
    slug: 'cosuri-gourmet',
    description: 'Coșuri cadou cu delicatese premium pentru gurmanzi',
    image: 'https://images.unsplash.com/photo-1596568359553-a5bba27a6f81?q=80&w=2000',
    featured: true,
  },
  {
    id: 'wine',
    name: 'Coșuri cu Vin',
    slug: 'cosuri-vin',
    description: 'Selecții de vinuri fine și complementele lor',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2000',
    parentId: 'gourmet',
  },
  {
    id: 'cheese',
    name: 'Coșuri cu Brânzeturi',
    slug: 'cosuri-branzeturi',
    description: 'Asortimente de brânzeturi fine și acompaniamente',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=2000',
    parentId: 'gourmet',
  },
  {
    id: 'chocolate',
    name: 'Coșuri cu Ciocolată',
    slug: 'cosuri-ciocolata',
    description: 'Selecții de ciocolată fină și delicii dulci',
    image: 'https://images.unsplash.com/photo-1548907040-4d2e36a35c1a?q=80&w=2000',
    parentId: 'gourmet',
  },
  {
    id: 'business',
    name: 'Coșuri Business',
    slug: 'cosuri-business',
    description: 'Cadouri corporative pentru parteneri și clienți',
    image: 'https://images.unsplash.com/photo-1596115763708-69932435a733?q=80&w=2000',
    featured: true,
  },
  {
    id: 'custom',
    name: 'Coșuri Personalizate',
    slug: 'cosuri-personalizate',
    description: 'Creează-ți propriul coș cadou personalizat',
    image: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=2000',
    featured: true,
  },
];

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Coș de Crăciun Premium',
    slug: 'cos-craciun-premium',
    price: 399.99,
    salePrice: 349.99,
    description: 'Un coș de lux care conține selecții rafinate de ciocolată belgiană, vinuri premium, brânzeturi fine și alte delicii festive. Ambalat elegant în nuanțe de roșu și auriu, acest coș este cadoul perfect pentru a aduce bucurie în orice cămin în perioada sărbătorilor.',
    shortDescription: 'Coș festiv cu vin, ciocolată și delicatese premium',
    images: [
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=1300',
      'https://images.unsplash.com/photo-1608755727748-7c044d7ee7dd?q=80&w=1300',
      'https://images.unsplash.com/photo-1577042939454-8b29d442b402?q=80&w=1300'
    ],
    category: 'christmas',
    isBestseller: true,
    isOnSale: true,
    stock: 25,
    ingredients: 'Vin roșu (750ml), ciocolată belgiană asortată (200g), brânzeturi fine (200g), nuci mixte caramelizate (150g), biscuiți cu ciocolată (100g), dulceață de smochine (150g), ceai negru premium (50g).',
    allergens: ['Conține: lactate, gluten, nuci', 'Poate conține urme de: soia, ou'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
  {
    id: 'p002',
    name: 'Coș Gourmet Délice',
    slug: 'cos-gourmet-delice',
    price: 299.99,
    description: 'Un coș sofisticat pentru iubitorii de gastronomie fină. Conține o selecție de specialități gourmet internaționale, inclusiv trufe, delicatese mediteraneene, și produse artizanale premium. Perfectă pentru a impresiona pe cei cu gusturi rafinate.',
    shortDescription: 'Selecție rafinată de specialități gourmet internaționale',
    images: [
      'https://images.unsplash.com/photo-1620589125156-fd5032c2ccb4?q=80&w=1300',
      'https://images.unsplash.com/photo-1606914501529-5a969fac6ff8?q=80&w=1300',
      'https://images.unsplash.com/photo-1576335937985-721dc656ad1e?q=80&w=1300',
    ],
    category: 'gourmet',
    isBestseller: true,
    isNew: false,
    stock: 15,
    ingredients: 'Ciocolată cu trufe (120g), ulei de măsline extravirgin (250ml), mix de măsline marinate (150g), tapenade (100g), biscuiți aperitiv (150g), nuci mixte (100g), miere cu trufe (100g).',
    allergens: ['Conține: lactate, gluten, nuci', 'Poate conține urme de: soia, fructe cu coajă lemnoasă'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
  {
    id: 'p003',
    name: 'Coș Romantic Rosé',
    slug: 'cos-romantic-rose',
    price: 249.99,
    description: 'Surprinde-ți jumătatea cu acest coș romantic, perfect pentru aniversări și zile speciale. Conține șampanie rosé, trufe de ciocolată, confiserie artizanală și alte delicii într-o prezentare elegantă și romantică.',
    shortDescription: 'Cadou romantic cu șampanie rosé și delicatese dulci',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1300',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=1300',
      'https://images.unsplash.com/photo-1518795880767-48cfb539c681?q=80&w=1300',
    ],
    category: 'valentines',
    isNew: true,
    stock: 20,
    ingredients: 'Șampanie rosé (750ml), trufe de ciocolată asortate (150g), biscuiți cu vanilie (100g), bomboane artizanale (100g), marmeladă de trandafiri (100g), petale de trandafir comestibile (10g).',
    allergens: ['Conține: lactate, gluten', 'Poate conține urme de: nuci, soia'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
  {
    id: 'p004',
    name: 'Coș Velier Vinuri Premium',
    slug: 'cos-vinuri-premium',
    price: 449.99,
    salePrice: 399.99,
    description: 'O selecție exclusivistă pentru pasionații de vinuri rafinate. Conține trei vinuri premium românești și internaționale, completate de accesorii pentru vin și delicatese care le pun în valoare. Un cadou impresionant pentru cunoscători.',
    shortDescription: 'Selecție premium de vinuri fine și accesorii',
    images: [
      'https://images.unsplash.com/photo-1584916551575-042a3300d8a3?q=80&w=1300',
      'https://images.unsplash.com/photo-1586370434639-0fe7fab3b04a?q=80&w=1300',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1300',
    ],
    category: 'wine',
    isOnSale: true,
    stock: 10,
    ingredients: 'Vin roșu Cabernet Sauvignon (750ml), vin alb Chardonnay (750ml), vin roze sec (750ml), brânză maturată (200g), crackers artizanali (100g), ciocolată neagră (100g), tirbușon profesional.',
    allergens: ['Conține: lactate, gluten', 'Poate conține urme de: nuci, soia'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
  {
    id: 'p005',
    name: 'Coș de Paște Tradițional',
    slug: 'cos-paste-traditional',
    price: 279.99,
    description: 'Sărbătorește Paștele cu acest coș tradițional bogat care include delicii specifice sărbătorilor pascale. Perfect pentru a fi dăruit familiei sau prietenilor, conține specialități precum cozonac, vin și alte produse tradiționale.',
    shortDescription: 'Coș festiv cu delicii tradiționale de Paște',
    images: [
      'https://images.unsplash.com/photo-1617690000547-acd7db5ba1d1?q=80&w=1300',
      'https://images.unsplash.com/photo-1615361200141-f45961202b75?q=80&w=1300',
      'https://images.unsplash.com/photo-1521104795873-bbd6fa3c9a0e?q=80&w=1300',
    ],
    category: 'easter',
    stock: 30,
    ingredients: 'Cozonac tradițional (500g), vin roșu (750ml), drob de miel (300g), ouă roșii decorate (6 bucăți), brânză de oaie (200g), pască (400g), șuncă afumată (250g), hrean (100g).',
    allergens: ['Conține: lactate, gluten, ouă', 'Poate conține urme de: nuci, soia'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
  {
    id: 'p006',
    name: 'Coș Corporate Excellence',
    slug: 'cos-corporate-excellence',
    price: 499.99,
    description: 'Impresionează-ți partenerii de afaceri cu acest coș corporativ elegant. Conține o selecție de produse premium, inclusiv băuturi fine, specialități culinare, și accesorii de business de calitate. Poate fi personalizat cu logo-ul companiei dumneavoastră.',
    shortDescription: 'Cadou corporativ premium pentru parteneri de afaceri',
    images: [
      'https://images.unsplash.com/photo-1596115763708-69932435a733?q=80&w=1300',
      'https://images.unsplash.com/photo-1578046509574-afeec92d6e03?q=80&w=1300',
      'https://images.unsplash.com/photo-1581467689966-150cd6fa232e?q=80&w=1300',
    ],
    category: 'business',
    isNew: true,
    isBestseller: true,
    stock: 15,
    ingredients: 'Whisky single malt (700ml), vin roșu premium (750ml), ciocolată belgiană (200g), cafea de specialitate (250g), fursecuri gourmet (150g), miere de trufe (100g), nuci macadamia (100g), agendă executivă din piele, stilou premium.',
    allergens: ['Conține: lactate, gluten, nuci', 'Poate conține urme de: soia, ouă'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în România pentru toate comenzile corporate. Personalizare cu logo disponibilă pentru comenzi de minim 10 coșuri. Timpul estimat de livrare: 3-5 zile lucrătoare.',
  },
  {
    id: 'p007',
    name: 'Coș Brânzeturi Fine',
    slug: 'cos-branzeturi-fine',
    price: 329.99,
    description: 'O încântare pentru iubitorii de brânzeturi, acest coș conține o selecție de brânzeturi fine din întreaga Europa, însoțite de fructe uscate, nuci, crackers și gem de smochine. Ideal pentru a fi savurat alături de un pahar de vin bun.',
    shortDescription: 'Selecție de brânzeturi internaționale și acompaniamente',
    images: [
      'https://images.unsplash.com/photo-1505714628981-7273b1a8b178?q=80&w=1300',
      'https://images.unsplash.com/photo-1596567830713-d7b4b5c5e996?q=80&w=1300',
      'https://images.unsplash.com/photo-1631379578550-7038263db699?q=80&w=1300',
    ],
    category: 'cheese',
    stock: 12,
    ingredients: 'Brânză Brie (150g), brânză Camembert (150g), brânză Roquefort (100g), brânză Gouda maturat (150g), brânză Parmigiano Reggiano (100g), crackers artizanali (100g), nuci mixte (100g), fructe uscate (100g), gem de smochine (100g).',
    allergens: ['Conține: lactate, gluten, nuci', 'Poate conține urme de: soia'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
  {
    id: 'p008',
    name: 'Coș Ciocolată Belgiană',
    slug: 'cos-ciocolata-belgiana',
    price: 259.99,
    salePrice: 229.99,
    description: 'Un paradis al ciocolatei pentru fanii dulciurilor fine. Conține o varietate de praline belgiene, tablete de ciocolată premium, trufe și alte delicii pe bază de ciocolată. Un cadou irezistibil pentru orice ocazie.',
    shortDescription: 'Asortiment de praline și specialități din ciocolată belgiană',
    images: [
      'https://images.unsplash.com/photo-1548907040-4d2e36a35c1a?q=80&w=1300',
      'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1300',
      'https://images.unsplash.com/photo-1526081317758-9526cd6f6eb7?q=80&w=1300',
    ],
    category: 'chocolate',
    isOnSale: true,
    stock: 20,
    ingredients: 'Praline belgiene asortate (200g), tabletă ciocolată neagră 70% (100g), tabletă ciocolată cu lapte (100g), tabletă ciocolată albă (100g), trufe de ciocolată asortate (150g), biscuiți înveliți în ciocolată (120g), ciocolată caldă premium (100g).',
    allergens: ['Conține: lactate, gluten, soia', 'Poate conține urme de: nuci, ouă'],
    nutritionalInfo: 'Valori nutriționale variază în funcție de produsele incluse. Pentru informații detaliate, consultați ambalajele produselor individuale.',
    deliveryInfo: 'Livrare gratuită în București pentru comenzi peste 200 RON. Pentru alte localități, costul livrării variază în funcție de distanță. Timpul estimat de livrare: 1-3 zile lucrătoare.',
  },
];
