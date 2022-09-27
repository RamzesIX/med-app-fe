import { CSSProperties, forwardRef, PropsWithChildren } from 'react'
import { List, ListItem } from '@mui/material'

export const MUIComponents = {
    // TODO fix any
    // eslint-disable-next-line react/display-name
    List: forwardRef<any, PropsWithChildren & { style?: CSSProperties }>(({ style, children }, listRef) => {
        return (
            <List classes={{ root: 'mui-app-list' }} style={style} component="div" ref={listRef}>
                {children}
            </List>
        )
    }),

    Item: ({ children, ...props }: PropsWithChildren) => {
        return (
            <ListItem component="div" {...props}>
                {children}
            </ListItem>
        )
    },
}
