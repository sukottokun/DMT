const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startTool() {
 state = {};
 showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

textNode.options.forEach(option => {
  if (showOption(option)) {
    const button = document.createElement('button')
    button.innerText = option.text
    button.classList.add('btn')
    button.addEventListener('click', () => selectOption(option))
    optionButtonsElement.appendChild(button)
  }
})
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startTool()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Is the site D8 or D9?',
    options: [
      {
        text: 'Yes',
        setState: { drupal9: true },
        shortDescription: "Drupal 8/9",
        nextText: 2
      },
      {
        text: 'No, it\'s drupal 7.',
        nextText: 8
      }
    ]
  },
  {
    id: 2,
    text: 'Do you have a single site or multiple sites?',
    options: [
      {
        text: 'I am migrating a single site',
        requiredState: (currentState) => currentState.drupal9,
        setState: {drupal9: true, singleSite: true},
        nextText: 3
      },
      {
        text: 'I am migrating multiple sites',
        requiredState: (currentState) => currentState.drupal9,
        setState: {drupal9: true, multipleSites: true},
        nextText: 9
      }
    ]
  },
  {
    id: 3,
    text: 'Is the ability to install \'One-Click Updates\' from the dashboard a requirement?',
    options: [
      {
        text: 'Yes',
        nextText: 4,
        setState: {drupal9: true, singleSite: true, useOCU: true},
      },
      {
        text: 'No',
        nextText: 5
      },
      {
        text: 'Not Sure',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Use Integrated Composer, the build tool included and integrated with Pantheon\'s workflow.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Do you want to use an external repo?',
    options: [
      {
        text: 'Yes',
        nextText: 6
      },
      {
        text: 'No',
        nextText: 11
      }
    ]
  },
  {
    id: 6,
    text: 'Are you using GH, Gitlab or BB?',
    options: [
      {
        text: 'Yes',
        nextText: 7
      },
      {
        text: 'No',
        nextText: 11
      }
    ]
  },
   {
    id: 7,
    text: 'Do you want a prebuilt but customisable PR workflow with testing? Or a custom workflow?',
    options: [
      {
        text: 'Build it for me',
        nextText: 12
      },
      {
        text: 'I will build it',
        nextText: 13
      }
    ]
  },
  {
    id: 8,
    text: 'Use our migration tool. Docs here.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Use Custom Upstreams. (How do they migrate? -SM) Docs here.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Use Github actions or something similar.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Will you deploy a complete build artifact to Pantheon?',
    options: [
      {
        text: 'Yes',
        nextText: 14
      },
       {
        text: 'No',
        nextText: 15
      }
    ]
  },
  {
    id: 12,
    text: 'Build Tools',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 13,
    text: 'DIY with GH actions or similar',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'Empty upstream with external build and deployment pipeline.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },
  {
    id: 15,
    text: 'Integrated Composer with custom external pipeline.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      },
    ]
  },

]

startTool()
