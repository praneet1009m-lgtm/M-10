/* RESTAURANT CONFIG: the only file you edit to personalise this demo.
   Meher Darbar is a FICTIONAL sample restaurant. Prices are sample prices (Demo menu). */
window.REST_CONFIG = {
 "id": "meher-darbar",
 "name": "Meher Darbar",
 "wordmark": "Meher Darbar",
 "logoMark": "M",
 "tagline": "North & coastal Indian kitchen · tandoor, curries, biryani & thalis",
 "demo": true,
 "tables": 12,
 "seatsPerTable": 6,
 "currency": {
  "symbol": "₹",
  "locale": "en-IN"
 },
 "charges": [
  {
   "label": "GST",
   "percent": 5
  }
 ],
 "orderPrefix": "MD",
 "colors": {
  "primary": "#C79A4B",
  "accent": "#7A2E2A",
  "background": "#0F1A17",
  "surface": "#16241F",
  "text": "#F3EBDD"
 },
 "hero": "assets/img/hero.webp",
 "menu": [
  {
   "id": "starters",
   "name": "Starters",
   "items": [
    {
     "id": "paneertikka",
     "name": "Paneer Tikka",
     "veg": true,
     "spice": 2,
     "description": "Cottage cheese and peppers, charred in the tandoor on skewers.",
     "image": "assets/img/paneertikka.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 220
      },
      {
       "id": "full",
       "name": "Full",
       "price": 380
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "chutney",
         "name": "Extra mint chutney",
         "price": 20
        },
        {
         "id": "onion",
         "name": "Lachha onion salad",
         "price": 30
        },
        {
         "id": "cheese",
         "name": "Cheese glaze",
         "price": 60
        }
       ]
      }
     ]
    },
    {
     "id": "chickentikka",
     "name": "Chicken Tikka",
     "veg": false,
     "spice": 2,
     "description": "Boneless chicken in a yoghurt-spice marinade, cooked in the tandoor.",
     "image": "assets/img/chickentikka.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 260
      },
      {
       "id": "full",
       "name": "Full",
       "price": 450
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "chutney",
         "name": "Extra mint chutney",
         "price": 20
        },
        {
         "id": "onion",
         "name": "Lachha onion salad",
         "price": 30
        },
        {
         "id": "cheese",
         "name": "Cheese glaze",
         "price": 60
        }
       ]
      }
     ]
    },
    {
     "id": "tandoori",
     "name": "Tandoori Chicken",
     "veg": false,
     "spice": 2,
     "description": "Bone-in chicken, red tandoori marinade, lime and onion on the side.",
     "image": "assets/img/tandoori.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 280
      },
      {
       "id": "full",
       "name": "Full",
       "price": 490
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "chutney",
         "name": "Extra mint chutney",
         "price": 20
        },
        {
         "id": "onion",
         "name": "Lachha onion salad",
         "price": 30
        },
        {
         "id": "cheese",
         "name": "Cheese glaze",
         "price": 60
        }
       ]
      }
     ]
    },
    {
     "id": "seekh",
     "name": "Seekh Kebab",
     "veg": false,
     "spice": 2,
     "description": "Minced meat with herbs and spices, grilled on skewers.",
     "image": "assets/img/seekh.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 270
      },
      {
       "id": "full",
       "name": "Full",
       "price": 470
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "chutney",
         "name": "Extra mint chutney",
         "price": 20
        },
        {
         "id": "onion",
         "name": "Lachha onion salad",
         "price": 30
        },
        {
         "id": "cheese",
         "name": "Cheese glaze",
         "price": 60
        }
       ]
      }
     ]
    },
    {
     "id": "fishtikka",
     "name": "Fish Tikka",
     "veg": false,
     "spice": 2,
     "description": "Fish chunks in a mustard-ajwain marinade, finished in the tandoor.",
     "image": "assets/img/fishtikka.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 300
      },
      {
       "id": "full",
       "name": "Full",
       "price": 520
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "chutney",
         "name": "Extra mint chutney",
         "price": 20
        },
        {
         "id": "onion",
         "name": "Lachha onion salad",
         "price": 30
        },
        {
         "id": "cheese",
         "name": "Cheese glaze",
         "price": 60
        }
       ]
      }
     ]
    },
    {
     "id": "chickenfry",
     "name": "South Indian Chicken Fry",
     "veg": false,
     "spice": 3,
     "description": "Crisp-fried chicken with curry-leaf spice, onion rings and lime.",
     "image": "assets/img/chickenfry.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 250
      },
      {
       "id": "full",
       "name": "Full",
       "price": 430
      }
     ]
    },
    {
     "id": "samosa",
     "name": "Punjabi Samosa",
     "veg": true,
     "spice": 1,
     "description": "Crisp pastry triangles filled with spiced potato and peas. Two per plate.",
     "image": "assets/img/samosa.webp",
     "price": 120,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "chole",
         "name": "Chole on the side",
         "price": 60
        },
        {
         "id": "chutney",
         "name": "Extra chutney",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "pakora",
     "name": "Mirchi Bhajji",
     "veg": true,
     "spice": 3,
     "description": "Long green chillies in a gram-flour batter, fried crisp.",
     "image": "assets/img/pakora.webp",
     "price": 140
    },
    {
     "id": "panipuri",
     "name": "Pani Puri",
     "veg": true,
     "spice": 2,
     "description": "Crisp puris with potato filling and tangy mint water. Six per plate.",
     "image": "assets/img/panipuri.webp",
     "price": 110
    },
    {
     "id": "gobimanchurian",
     "name": "Gobi Manchurian",
     "veg": true,
     "spice": 2,
     "description": "Crispy cauliflower tossed in an Indo-Chinese chilli-garlic sauce.",
     "image": "assets/img/gobimanchurian.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 170
      },
      {
       "id": "full",
       "name": "Full",
       "price": 290
      }
     ]
    }
   ]
  },
  {
   "id": "mains",
   "name": "Main Course",
   "items": [
    {
     "id": "butterchicken",
     "name": "Butter Chicken",
     "veg": false,
     "spice": 1,
     "description": "Tandoori chicken in a buttery, gently spiced tomato gravy.",
     "image": "assets/img/butterchicken.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 290
      },
      {
       "id": "full",
       "name": "Full",
       "price": 520
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 30
        },
        {
         "id": "cream",
         "name": "Extra cream",
         "price": 40
        }
       ]
      }
     ]
    },
    {
     "id": "paneermakhani",
     "name": "Paneer Makhani",
     "veg": true,
     "spice": 1,
     "description": "Paneer cubes in a velvety tomato-cashew makhani gravy.",
     "image": "assets/img/paneermakhani.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 250
      },
      {
       "id": "full",
       "name": "Full",
       "price": 440
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 30
        },
        {
         "id": "cream",
         "name": "Extra cream",
         "price": 40
        },
        {
         "id": "jain",
         "name": "Jain prep (no onion/garlic)",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "dalmakhani",
     "name": "Dal Makhani",
     "veg": true,
     "spice": 1,
     "description": "Black lentils slow-simmered overnight, finished with cream.",
     "image": "assets/img/dalmakhani.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 190
      },
      {
       "id": "full",
       "name": "Full",
       "price": 330
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 30
        },
        {
         "id": "cream",
         "name": "Extra cream",
         "price": 40
        },
        {
         "id": "jain",
         "name": "Jain prep (no onion/garlic)",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "daltadka",
     "name": "Dal Tadka",
     "veg": true,
     "spice": 1,
     "description": "Yellow lentils tempered with ghee, cumin, garlic and red chilli.",
     "image": "assets/img/daltadka.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 160
      },
      {
       "id": "full",
       "name": "Full",
       "price": 280
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 30
        },
        {
         "id": "cream",
         "name": "Extra cream",
         "price": 40
        },
        {
         "id": "jain",
         "name": "Jain prep (no onion/garlic)",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "palak",
     "name": "Palak Paneer",
     "veg": true,
     "spice": 1,
     "description": "Paneer in a smooth spiced spinach gravy.",
     "image": "assets/img/palak.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 240
      },
      {
       "id": "full",
       "name": "Full",
       "price": 420
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 30
        },
        {
         "id": "cream",
         "name": "Extra cream",
         "price": 40
        },
        {
         "id": "jain",
         "name": "Jain prep (no onion/garlic)",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "chanamasala",
     "name": "Chana Masala",
     "veg": true,
     "spice": 2,
     "description": "Chickpeas in an onion-tomato masala with whole spices.",
     "image": "assets/img/chanamasala.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 180
      },
      {
       "id": "full",
       "name": "Full",
       "price": 310
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 30
        },
        {
         "id": "cream",
         "name": "Extra cream",
         "price": 40
        },
        {
         "id": "jain",
         "name": "Jain prep (no onion/garlic)",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "alookofta",
     "name": "Aloo Rassa",
     "veg": true,
     "spice": 2,
     "description": "Home-style potato curry in a thin, spiced tomato gravy with coriander.",
     "image": "assets/img/alookofta.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 160
      },
      {
       "id": "full",
       "name": "Full",
       "price": 280
      }
     ]
    },
    {
     "id": "cholebhature",
     "name": "Amritsari Kulcha & Chole",
     "veg": true,
     "spice": 2,
     "description": "Two stuffed kulchas with a bowl of chole and chutney.",
     "image": "assets/img/cholebhature.webp",
     "price": 260
    },
    {
     "id": "kadaichicken",
     "name": "Kadai Chicken",
     "veg": false,
     "spice": 3,
     "description": "Chicken with peppers and freshly ground kadai masala.",
     "image": "assets/img/kadaichicken.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 290
      },
      {
       "id": "full",
       "name": "Full",
       "price": 510
      }
     ]
    },
    {
     "id": "muttoncurry",
     "name": "Mutton Curry",
     "veg": false,
     "spice": 3,
     "description": "Bone-in mutton slow-cooked in a robust onion-tomato gravy.",
     "image": "assets/img/muttoncurry.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 360
      },
      {
       "id": "full",
       "name": "Full",
       "price": 640
      }
     ]
    },
    {
     "id": "fishcurry",
     "name": "Kerala Fish Curry",
     "veg": false,
     "spice": 2,
     "description": "Fish simmered in a coconut-milk gravy with tomato and green chilli.",
     "image": "assets/img/fishcurry.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 320
      },
      {
       "id": "full",
       "name": "Full",
       "price": 560
      }
     ]
    },
    {
     "id": "eggcurry",
     "name": "Egg Curry",
     "veg": false,
     "spice": 2,
     "description": "Boiled eggs in a spiced onion-tomato gravy.",
     "image": "assets/img/eggcurry.webp",
     "price": 220
    }
   ]
  },
  {
   "id": "breads",
   "name": "Breads",
   "items": [
    {
     "id": "garlicnaan",
     "name": "Butter Naan",
     "veg": true,
     "spice": 0,
     "description": "Soft leavened bread from the tandoor, brushed with butter.",
     "image": "assets/img/garlicnaan.webp",
     "price": 60,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 20
        },
        {
         "id": "garlic",
         "name": "Garlic & coriander",
         "price": 20
        }
       ]
      }
     ]
    },
    {
     "id": "butternaan",
     "name": "Plain Naan",
     "veg": true,
     "spice": 0,
     "description": "Classic tandoor-baked naan.",
     "image": "assets/img/butternaan.webp",
     "price": 50,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 20
        },
        {
         "id": "garlic",
         "name": "Garlic & coriander",
         "price": 20
        }
       ]
      }
     ]
    },
    {
     "id": "roti",
     "name": "Tandoori Roti",
     "veg": true,
     "spice": 0,
     "description": "Whole-wheat flatbread from the tandoor.",
     "image": "assets/img/roti.webp",
     "price": 35,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 20
        },
        {
         "id": "garlic",
         "name": "Garlic & coriander",
         "price": 20
        }
       ]
      }
     ]
    },
    {
     "id": "lachha",
     "name": "Lachha Paratha",
     "veg": true,
     "spice": 0,
     "description": "Flaky, many-layered whole-wheat paratha.",
     "image": "assets/img/lachha.webp",
     "price": 70,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 20
        },
        {
         "id": "garlic",
         "name": "Garlic & coriander",
         "price": 20
        }
       ]
      }
     ]
    },
    {
     "id": "alooparatha",
     "name": "Aloo Paratha",
     "veg": true,
     "spice": 1,
     "description": "Whole-wheat paratha stuffed with spiced potato, with curd and pickle.",
     "image": "assets/img/alooparatha.webp",
     "price": 120,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "butter",
         "name": "Extra butter",
         "price": 20
        },
        {
         "id": "garlic",
         "name": "Garlic & coriander",
         "price": 20
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "rice",
   "name": "Rice & Biryani",
   "items": [
    {
     "id": "chickenbiryani",
     "name": "Chicken Biryani",
     "veg": false,
     "spice": 2,
     "description": "Basmati rice layered with spiced chicken, sealed and slow-cooked.",
     "image": "assets/img/chickenbiryani.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 260
      },
      {
       "id": "full",
       "name": "Full",
       "price": 450
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "raita",
         "name": "Boondi raita",
         "price": 60
        },
        {
         "id": "salan",
         "name": "Mirchi ka salan",
         "price": 70
        },
        {
         "id": "egg",
         "name": "Boiled egg",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "muttonbiryani",
     "name": "Mutton Biryani",
     "veg": false,
     "spice": 2,
     "description": "Fragrant basmati layered with tender mutton and whole spices.",
     "image": "assets/img/muttonbiryani.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 330
      },
      {
       "id": "full",
       "name": "Full",
       "price": 580
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "raita",
         "name": "Boondi raita",
         "price": 60
        },
        {
         "id": "salan",
         "name": "Mirchi ka salan",
         "price": 70
        },
        {
         "id": "egg",
         "name": "Boiled egg",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "vegbiryani",
     "name": "Vegetable Pulao",
     "veg": true,
     "spice": 1,
     "description": "Basmati rice cooked with mixed vegetables and whole spices.",
     "image": "assets/img/vegbiryani.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 180
      },
      {
       "id": "full",
       "name": "Full",
       "price": 310
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "raita",
         "name": "Boondi raita",
         "price": 60
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "peapulao",
     "name": "Matar Pulao",
     "veg": true,
     "spice": 0,
     "description": "Basmati rice with green peas and cumin.",
     "image": "assets/img/peapulao.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 160
      },
      {
       "id": "full",
       "name": "Full",
       "price": 280
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "raita",
         "name": "Boondi raita",
         "price": 60
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "jeerarice",
     "name": "Jeera Rice",
     "veg": true,
     "spice": 0,
     "description": "Basmati rice tempered with cumin and ghee.",
     "image": "assets/img/jeerarice.webp",
     "portions": [
      {
       "id": "half",
       "name": "Half",
       "price": 140
      },
      {
       "id": "full",
       "name": "Full",
       "price": 230
      }
     ],
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "raita",
         "name": "Boondi raita",
         "price": 60
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "curdrice",
     "name": "Curd Rice",
     "veg": true,
     "spice": 0,
     "description": "Soft rice with yoghurt, tempered with mustard, curry leaves and dry chilli.",
     "image": "assets/img/curdrice.webp",
     "price": 160
    }
   ]
  },
  {
   "id": "thalis",
   "name": "Thalis",
   "items": [
    {
     "id": "vegthali",
     "name": "Darbar Veg Thali",
     "veg": true,
     "spice": 1,
     "description": "A full plate: dal, two sabzis, paneer, rice, breads, papad and a sweet. Contents vary daily.",
     "image": "assets/img/vegthali.webp",
     "price": 380,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "sweet",
         "name": "Extra sweet",
         "price": 50
        },
        {
         "id": "bread",
         "name": "Extra bread",
         "price": 40
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "rotithali",
     "name": "Roti-Sabzi Thali",
     "veg": true,
     "spice": 1,
     "description": "Dal, two seasonal sabzis, salad and phulkas. A lighter home-style plate.",
     "image": "assets/img/rotithali.webp",
     "price": 280,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "sweet",
         "name": "Extra sweet",
         "price": 50
        },
        {
         "id": "bread",
         "name": "Extra bread",
         "price": 40
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "fishthali",
     "name": "Coastal Fish Thali",
     "veg": false,
     "spice": 2,
     "description": "Fried fish, fish curry, rice, sol kadhi-style sides and accompaniments.",
     "image": "assets/img/fishthali.webp",
     "price": 460,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "sweet",
         "name": "Extra sweet",
         "price": 50
        },
        {
         "id": "bread",
         "name": "Extra bread",
         "price": 40
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    },
    {
     "id": "keralameals",
     "name": "Kerala Meals",
     "veg": false,
     "spice": 2,
     "description": "Rice on banana leaf with fried fish, curries, thoran and pickle.",
     "image": "assets/img/keralameals.webp",
     "price": 420,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "sweet",
         "name": "Extra sweet",
         "price": 50
        },
        {
         "id": "bread",
         "name": "Extra bread",
         "price": 40
        },
        {
         "id": "papad",
         "name": "Roasted papad",
         "price": 30
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "beverages",
   "name": "Beverages",
   "items": [
    {
     "id": "masalachai",
     "name": "Masala Chai",
     "veg": true,
     "spice": 0,
     "description": "Strong tea brewed with milk, ginger and cardamom.",
     "image": "assets/img/masalachai.webp",
     "price": 60,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "ginger",
         "name": "Extra ginger",
         "price": 0
        },
        {
         "id": "lesssugar",
         "name": "Less sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "filterkaapi",
     "name": "Filter Coffee",
     "veg": true,
     "spice": 0,
     "description": "South Indian decoction coffee frothed with hot milk.",
     "image": "assets/img/filterkaapi.webp",
     "price": 80,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "ginger",
         "name": "Extra ginger",
         "price": 0
        },
        {
         "id": "lesssugar",
         "name": "Less sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "sweetlassi",
     "name": "Sweet Lassi",
     "veg": true,
     "spice": 0,
     "description": "Chilled, thick churned yoghurt, lightly sweetened.",
     "image": "assets/img/sweetlassi.webp",
     "price": 110,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "lessice",
         "name": "Less ice",
         "price": 0
        },
        {
         "id": "nosugar",
         "name": "No sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "mangolassi",
     "name": "Mango Lassi",
     "veg": true,
     "spice": 0,
     "description": "Yoghurt blended with ripe mango pulp.",
     "image": "assets/img/mangolassi.webp",
     "price": 140,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "lessice",
         "name": "Less ice",
         "price": 0
        },
        {
         "id": "nosugar",
         "name": "No sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "chaas",
     "name": "Masala Chaas",
     "veg": true,
     "spice": 1,
     "description": "Spiced buttermilk with roasted cumin and coriander.",
     "image": "assets/img/chaas.webp",
     "price": 70,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "lessice",
         "name": "Less ice",
         "price": 0
        },
        {
         "id": "nosugar",
         "name": "No sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "aampanna",
     "name": "Aam Panna",
     "veg": true,
     "spice": 0,
     "description": "Raw-mango cooler with mint and roasted cumin.",
     "image": "assets/img/aampanna.webp",
     "price": 110,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "lessice",
         "name": "Less ice",
         "price": 0
        },
        {
         "id": "nosugar",
         "name": "No sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "nimbupani",
     "name": "Nimbu Soda",
     "veg": true,
     "spice": 0,
     "description": "Fresh lime with soda, sweet, salted or mixed.",
     "image": "assets/img/nimbupani.webp",
     "price": 80,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "lessice",
         "name": "Less ice",
         "price": 0
        },
        {
         "id": "nosugar",
         "name": "No sugar",
         "price": 0
        }
       ]
      }
     ]
    },
    {
     "id": "kokumcooler",
     "name": "Kokum Sherbet",
     "veg": true,
     "spice": 0,
     "description": "Tangy-sweet kokum cooler, served chilled.",
     "image": "assets/img/kokumcooler.webp",
     "price": 90,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "lessice",
         "name": "Less ice",
         "price": 0
        },
        {
         "id": "nosugar",
         "name": "No sugar",
         "price": 0
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "desserts",
   "name": "Desserts",
   "items": [
    {
     "id": "gulabjamun",
     "name": "Gulab Jamun",
     "veg": true,
     "spice": 0,
     "description": "Soft milk dumplings soaked in warm cardamom syrup. Two per plate.",
     "image": "assets/img/gulabjamun.webp",
     "price": 120,
     "addons": [
      {
       "id": "x",
       "name": "Add-ons",
       "options": [
        {
         "id": "icecream",
         "name": "Vanilla ice cream",
         "price": 60
        }
       ]
      }
     ]
    },
    {
     "id": "kulfi",
     "name": "Malai Kulfi",
     "veg": true,
     "spice": 0,
     "description": "Dense, slow-reduced milk ice with nuts.",
     "image": "assets/img/kulfi.webp",
     "price": 130
    }
   ]
  }
 ]
};
