/**
 * ===================================================================
 * 💙 BIRTHDAY WEBSITE CONFIGURATION FILE (config.js) 💙
 * ===================================================================
 * 
 * Central configuration for your best friend's birthday website.
 * All text, photos, captions, memories, and settings are defined here.
 */

window.BIRTHDAY_CONFIG = {
  // Best Friend's Name / Nickname
  friendName: "My Pretty Girl",
  
  // -----------------------------------------------------------------
  // SCREEN 1: THE BIRTHDAY CAKE 🎂
  // -----------------------------------------------------------------
  cakeScreen: {
    heading: "HAPPY BIRTHDAY, MY PRETTY GIRL!!",
    subtitle: "I've made a little something just for you.",
    wishPrompt: "Make a wish ✨",
    blowPrompt: "Okay, now blow out your candles!",
    blowButtonText: "Blow the candles 🕯️",
    wishMadeText: "Wish made? Good. Now let's make this birthday a little more special. 💙",
    openSurpriseText: "Open your surprise ♡"
  },

  // -----------------------------------------------------------------
  // SCREEN 2: THE GIFT BOX 🎁
  // -----------------------------------------------------------------
  giftBoxScreen: {
    heading: "Here's your gift, birthday girl! 💙",
    subheading: "Click the box to open your four special surprises:",
    cards: [
      {
        id: "letter",
        title: "A little letter for you 💌",
        subtitle: "Straight from my heart to yours",
        badge: "Gift 1"
      },
      {
        id: "album",
        title: "Our Polaroid album 📸",
        subtitle: "Little pieces of us through the years",
        badge: "Gift 2"
      },
      {
        id: "memories",
        title: "Our memories together 🫂",
        subtitle: "The chaos, the walks, and the inside jokes",
        badge: "Gift 3"
      },
      {
        id: "poem",
        title: "One little surprise for you 🎀",
        subtitle: "My favourite kind of pretty",
        badge: "Gift 4"
      }
    ],
    readyForFinalText: "Ready for one last little surprise? ✨",
    finalSurpriseButton: "Wait... there's one last thing 💌"
  },

  // -----------------------------------------------------------------
  // SCREEN 3: MY BIRTHDAY LETTER 💌
  // -----------------------------------------------------------------
  // NOTE: No letter.txt / letter.docx was found in the project folder.
  // Below is the clearly labeled placeholder. Paste your exact letter here!
  letterScreen: {
    title: "A little letter for you ♡",
    date: "A special note for your special day",
    isPlaceholder: true,
    missingNotice: "📌 Note: No 'letter.txt' file was found in your folder. You can easily paste your real letter into config.js under letterContent!",
    letterContent: `To my dearest best friend,

Happy Happy Birthday! 🎂💙

Words can never really be enough to tell you how grateful I am to have you in my life. Through every phase, every laugh, every breakdown, and every random walk home, you have been my constant, safe space.

Thank you for being the person who understands my silence just as well as my endless chatter. Thank you for never judging my terrible jokes and for always being the first one to hype me up. 

I hope this year brings you all the softness, success, warmth, and peace you so truly deserve. You are one of the purest, prettiest souls I know, inside and out.

No matter where life takes us, remember that you'll always have me in your corner, cheering you on.

Forever & always your best friend 💙`,

    signature: "With all my love, always ♡",
    backButtonText: "Back to our little gifts ♡"
  },

  // -----------------------------------------------------------------
  // SCREEN 4: OUR POLAROID PHOTO ALBUM 📸
  // -----------------------------------------------------------------
  // Actual photographs from your folder. Captions are editable placeholders.
  photoAlbumScreen: {
    title: "Little pieces of us ♡",
    subtitle: "A digital scrapbook of our favourite moments together",
    photos: [
      {
        id: 1,
        src: "./234a0201-4546-4274-ac7c-08d7a2084954.jfif",
        caption: "Our iconic swing spot & green t-shirt day 🌿✨",
        date: "College Days",
        rotation: -2
      },
      {
        id: 2,
        src: "./3f6cc174-a625-4722-acf0-ccfd988cec5a.jfif",
        caption: "Sunny smiles & matching the vibe 🌸💙",
        date: "Best Moments",
        rotation: 3
      },
      {
        id: 3,
        src: "./d2c475c2-8ac7-427f-a9f4-c64706fad886.jfif",
        caption: "The tightest, most chaotic hug ever! 🫂❤️",
        date: "Pure Joy",
        rotation: -3
      },
      {
        id: 4,
        src: "./eae3afad-98ab-4d9b-ad65-b4eed8cdbcc2.jfif",
        caption: "Heart filters and looking at each other laughing 💕",
        date: "Unfiltered Chaos",
        rotation: 2
      },
      {
        id: 5,
        src: "./f657e161-67eb-4fd5-b9f2-9aff2c53f821.jfif",
        caption: "Uniform days, masks on, and hugging through it all 🎒💙",
        date: "School Era",
        rotation: -2
      },
      {
        id: 6,
        src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif",
        caption: "Dressed up, fairy lights, and balloon night ✨🎈",
        date: "Night Adventures",
        rotation: 3
      },
      {
        id: 7,
        src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif",
        caption: "ID cards, sweaters, and late-night thumbs up 👍🏻🌙",
        date: "College Memories",
        rotation: -1
      },
      {
        id: 8,
        src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif",
        caption: "Saree edition & mirror selfie shenanigans 🥻🪞",
        date: "Desi Vibe",
        rotation: 2
      },
      {
        id: 9,
        src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif",
        caption: "Looking pretty together in the mirror ✨💄",
        date: "Out & About",
        rotation: -3
      },
      {
        id: 10,
        src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif",
        caption: "Chilling in the bedroom doing absolutely nothing 🏠🛋️",
        date: "Second Home",
        rotation: 1
      },
      {
        id: 11,
        src: "./jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj.jfif",
        caption: "Random goofy dancing and endless inside jokes 💃🏻✨",
        date: "Goofballs",
        rotation: -2
      }
    ],
    backButtonText: "Back to our little gifts ♡"
  },

  // -----------------------------------------------------------------
  // SCREEN 5: OUR MEMORIES TOGETHER 🫂
  // -----------------------------------------------------------------
  // All 9 real memories from your prompt:
  memoriesScreen: {
    title: "Our Memories Together 🫂",
    subtitle: "A little look back at all the chaos and love we share",
    memories: [
      {
        id: 1,
        title: "Our never-ending walks",
        tag: "Since 8th Standard 🎒",
        icon: "🚶‍♀️",
        photo: null,
        content: "We've been walking to school together since eighth standard. Same roads, same nonsense, and somehow we never ran out of things to talk about. Those walks turned into a whole never-ending story and remain one of my absolute favourite memories of us."
      },
      {
        id: 2,
        title: "\"Where is she?\"",
        tag: "Package Deal 👯‍♀️",
        icon: "❓",
        photo: null,
        content: "When one of us was absent, everyone would instantly ask the other about her. We became such a familiar pair that people noticed the second one of us wasn't around. Like... why are you asking me? (Obviously because we're inseparable!)"
      },
      {
        id: 3,
        title: "The seat-changing incidents",
        tag: "Partners in Crime 🚨",
        icon: "🪑",
        photo: null,
        content: "Teachers literally used to change our seats because we talked so much together! Every time they separated us, it felt like they were trying to break up a criminal syndicate. And honestly? We still found ways to yap across the room."
      },
      {
        id: 4,
        title: "Professional yap sessions",
        tag: "24/7 Hotlines 📱",
        icon: "🗣️",
        photo: null,
        content: "Random reels, making videos at your house, unplanned late-night video calls, and talking about absolutely anything under the sun. No script, no reason, just pure unfiltered best friend conversation."
      },
      {
        id: 5,
        title: "Our unofficial second home",
        tag: "Second Home 🏠",
        icon: "🛋️",
        photo: null,
        content: "Going to your house just to chill, spend time together, and do absolutely nothing particularly important. Just existing there like I practically live there—one of the most comforting feelings ever."
      },
      {
        id: 6,
        title: "The gossip department",
        tag: "Honors Degree ☕",
        icon: "🍵",
        photo: null,
        content: "Our iconic sessions of bitching about people together. At this point, we could give masterclasses and publish textbooks on our analysis. Unmatched therapy sessions honestly."
      },
      {
        id: 7,
        title: "Pandal-hopping adventures",
        tag: "Festive Chaos ✨",
        icon: "🪔",
        photo: null,
        content: "Our memories of visiting pandals together—the festive atmosphere, the crowds, the food, the Ganesh Chaturthi outings, and our usual chaos navigating through it all together."
      },
      {
        id: 8,
        title: "The accidental class holiday",
        tag: "Unintentional Heroes 🦠",
        icon: "🏖️",
        photo: null,
        content: "The time both of us got COVID and the entire class ended up getting an unexpected holiday because of us! Being sick was definitely not fun, but being responsible for the whole class getting a day off is definitely hall-of-fame material."
      },
      {
        id: 9,
        title: "The birthday Twirla incident",
        tag: "Core Memory 💃🏻",
        icon: "🩹",
        photo: null,
        content: "On my birthday, when we both fell off a Twirla and you fractured your hand. Definitely chaotic, definitely terrifying in the moment, but now permanently etched in the 'legendary core memories' vault of our friendship."
      }
    ],
    backButtonText: "Back to our little gifts ♡"
  },

  // -----------------------------------------------------------------
  // SCREEN 6: MY POEM 🩵
  // -----------------------------------------------------------------
  // NOTE: No poem.txt was found in your project folder.
  // Below is the clearly labeled placeholder. Paste your exact poem verses here!
  poemScreen: {
    heading: "My Favourite Kind of Pretty",
    subheading: "A little rhyme dedicated to you ♡",
    isPlaceholder: true,
    missingNotice: "📌 Note: No 'poem.txt' file was found in your folder. You can easily paste your real poem into config.js under stanzas!",
    stanzas: [
      [
        "There's a beauty in the way you laugh,",
        "Unfiltered, loud, and true,",
        "In all the silly little things",
        "That make you simply you."
      ],
      [
        "Not just the pretty smile you wear,",
        "Or the kindness in your grace,",
        "It’s the warmth you bring into my world,",
        "And the light in every place."
      ],
      [
        "Through walks to school and late night talks,",
        "Through every changed seat and year,",
        "You've been my constant, gentle calm,",
        "My favourite person here."
      ],
      [
        "So here's to you on your special day,",
        "Soft and bright and free,",
        "You will always be, without a doubt,",
        "My favourite kind of pretty. 🩵"
      ]
    ],
    backButtonText: "Back to our little gifts ♡"
  },

  // -----------------------------------------------------------------
  // SCREEN 7: THE FINAL SURPRISE — "ONE LAST THING" 💌
  // -----------------------------------------------------------------
  finalScreen: {
    heading: "Wait... there's one last thing. 💙",
    envelopeButtonText: "Open this, too ♡",
    
    // EXACT sentimental message requested by user
    messageParagraphs: [
      "To my favourite constant,",
      "I think one of my favourite things about us is that we never really needed a reason to be together. Walking home from school, talking about absolutely nothing, laughing at the most random things… somehow, those became some of my favourite memories.",
      "Now we're growing up, doing our own things, and figuring life out in different places. And even though things aren't exactly the same as they used to be, I'm so glad that I got to grow up with you.",
      "If I could keep one thing from all these years, it would be having you in them.",
      "So here's to all the memories we've already made, all the stories we haven't told each other yet, and all the random days that will eventually become our favourite memories again.",
      "Happy birthday, my love. No matter how much life changes, I hope we always find our way back to each other. 💙",
      "Always your girl ♡"
    ],
    
    // Configurable photo of the two of you together hugging
    finalPhoto: "./d2c475c2-8ac7-427f-a9f4-c64706fad886.jfif",
    finalPhotoCaption: "Forever my favourite person 🫂💙",
    
    // Closing quote & final greeting
    closingQuote: "If I had to do all those years again, I'd still choose you as my best friend. Every single time. 💙",
    bottomGreeting: "HAPPY BIRTHDAY ONCE AGAIN, MY LOVE! ♡"
  }
};

var BIRTHDAY_CONFIG = window.BIRTHDAY_CONFIG;
