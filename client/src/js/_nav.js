export default {
  items: [
    {
      name: 'Tools',
      url: '/mainflow',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Calculator',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Calculator',
      url: '/mainflow',
      icon: 'icon-drop',
    },
    {
      title: true,
      name: 'Internal Data',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Press',
      url: '/press_data',
      icon: 'icon-fire',
    },
    {
      name: 'Alloy',
      url: '/alloy',
      icon: 'icon-magnet',
    },
    {
      name: 'Surface',
      url: '/surface',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Complexity',
      url: '/complexity',
      icon: 'icon-shuffle',
    }
  ],
};
