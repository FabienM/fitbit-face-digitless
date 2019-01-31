function settings(props: any) {
    return (
        <Page>
            <Section
                title={<Text bold align="center">Settings</Text>}>
                <Toggle
                    settingsKey="disableSeconds"
                    label="Bar does not extend with seconds"
                />
                <Toggle
                    settingsKey="disableMeridiem"
                    label="Disable meridiem indicator (12h format only)"
                />
                <Text align="left">Background Color</Text>
                <ColorSelect
                    settingsKey="backgroundColor"
                    colors={[
                        {color: 'black'},
                        {color: '#303030'}, // fb-extra-dark-gray
                        {color: '#505050'}, // fb-dark-gray
                        {color: 'midnightblue'},
                        {color: 'navy'},
                        {color: '#1B2C40'}, // fb-slate-press
                        {color: '#134022'}, // fb-green-press
                        {color: 'darkgreen'},
                        {color: 'darkolivegreen'},
                        {color: 'darkred'}
                    ]}
                />
                <Text align="left">Foreground Color</Text>
                <ColorSelect
                    settingsKey="foregroundColor"
                    colors={[
                        {color: '#3BF7DE'}, // fb-aqua
                        {color: '#5B4CFF'}, // fb-indigo
                        {color: '#14D3F5'}, // fb-cyan
                        {color: '#00E1AA'}, // "seafoam"
                        {color: '#5BE37D'}, // fb-mint
                        {color: '#B8FC68'}, // fb-lime
                        {color: '#E4FA3C'}, // fb-yellow
                        {color: '#FFCC33'}, // fb-peach
                        {color: 'coral'},
                        {color: 'crimson'},
                        {color: '#F83478'}, // fb-pink
                        {color: '#A51E7C'}, // fb-plum
                        {color: '#BCD8F8'}, // fb-lavender
                        {color: '#A0A0A0'}, // fb-lightgray
                        {color: 'white'}    // fb-white
                    ]}
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(settings);