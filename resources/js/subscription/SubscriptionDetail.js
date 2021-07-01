import React from "react";
import {
    Card,
    CardActions,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const SubscriptionDetail=({item})=>{
    return(
        <Card elevation={0}>
            <CardHeader title={"ID: "+item?.id}/>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Payment id</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item?.subscriptions && item?.subscriptions.map(sub=>
                                <TableRow key={sub?.id}>
                                    <TableCell>{sub.receipt}</TableCell>
                                    <TableCell>{sub.course}</TableCell>
                                    <TableCell>{sub.status}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </CardContent>
            <CardActions>
                <Button color={"primary"} variant={'outlined'}>action</Button>
                <Button color={"secondary"} variant={'outlined'}>test</Button>
            </CardActions>
        </Card>
    )
}
export default SubscriptionDetail;
